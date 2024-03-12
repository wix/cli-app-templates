import { useWixFetch } from '@wix/sdk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// https://dev.wix.com/docs/rest/api-reference/app-management/apps/embedded-scripts/introduction
const EMBEDDED_SCRIPT_API_URL = 'https://www.wixapis.com/apps/v1/scripts';

export const QUERY_EMBEDS = 'queryEmbeds';
export const MUTATE_EMBEDS = 'mutateEmbeds';

export const useEmbeds = <T>() => {
  const wixFetch = useWixFetch();
  const queryClient = useQueryClient();

  const queryEmbeds = useQuery<unknown, unknown, T>({
    queryKey: [QUERY_EMBEDS],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const data = (await wixFetch(EMBEDDED_SCRIPT_API_URL, {
        method: 'get',
        headers: { 'content-type': 'application/json' },
      }).then((res) => res.json())) as { properties: { parameters: T } };

      return data?.properties?.parameters;
    },
  });

  const injectEmbeds = useMutation<unknown, unknown, T>({
    mutationKey: [MUTATE_EMBEDS],
    mutationFn: async (parameters) => {
      await wixFetch(EMBEDDED_SCRIPT_API_URL, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          properties: {
            parameters,
          },
        }),
      });
      return parameters;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_EMBEDS], data);
    },
  });

  return { queryEmbeds, injectEmbeds };
};
