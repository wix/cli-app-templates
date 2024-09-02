import { embeddedScripts } from '@wix/app-management';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const QUERY_EMBEDS = 'queryEmbeds';
export const MUTATE_EMBEDS = 'mutateEmbeds';

export const useEmbeds = <T extends Record<string, string>>() => {
  const queryClient = useQueryClient();

  const getEmbeddedScript = useQuery<unknown, unknown, T>({
    queryKey: [QUERY_EMBEDS],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      // https://dev.wix.com/docs/sdk/backend-modules/app-market/embedded-scripts/get-embedded-script
      const embeddedScript = await embeddedScripts.getEmbeddedScript();
      return embeddedScript.parameters || {};
    },
  });

  const embedScript = useMutation<unknown, unknown, T>({
    mutationKey: [MUTATE_EMBEDS],
    mutationFn: async (parameters) => {
      // https://dev.wix.com/docs/sdk/backend-modules/app-market/embedded-scripts/embed-script
      await embeddedScripts.embedScript({ parameters });
      return parameters;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_EMBEDS], data);
    },
  });

  return { embedScript, getEmbeddedScript };
};