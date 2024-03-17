# Mixpanel Analytics Template

## Description
Mixpanel Analytics App contains the following [Wix Extensions](https://dev.wix.com/docs/build-apps/developer-tools/extensions/about-extensions#about-extensions):

### Dashboard Pages

| Page                                              | Route  | Description                    |
| ------------------------------------------------- | -------| ------------------------------ |
| [Setup](./template/src/dashboard/pages/page.tsx)  | `/`    | Allows to set the Mixpanel Tag   |

### Embedded Script

[Embedded Script](https://dev.wix.com/docs/build-apps/developer-tools/extensions/embedded-scripts#set-up-an-embedded-script) app extension enables to insert custom script tags to users' websites.

The template contains the [script](./template/src/website/embedded-scripts/mixpanel-analytics/embedded.html) for embedding Mixpanel Analytics to a site.
We also [configured the script](./template/src/website/embedded-scripts/mixpanel-analytics/embedded.json) as explained [here](https://dev.wix.com/docs/build-apps/developer-tools/cli/wix-cli-for-apps/extensions/embedded-scripts#step-4---add-configuration-details-for-your-embedded-script)


### Wix APIs 

Using [Wix fetch](https://dev.wix.com/docs/sdk/api-reference/sdk-react/hooks#hooks) from [Wix SDK React](https://dev.wix.com/docs/sdk/api-reference/sdk-react/setup#setup) we are calling 2 endpoints:

1. [Get Embedded Script](https://dev.wix.com/docs/rest/api-reference/app-management/apps/embedded-scripts/get-embedded-script)
2. [Inject Embed Script](https://dev.wix.com/docs/rest/api-reference/app-management/apps/embedded-scripts/embed-script)


## Prerequisites
Before getting started, make sure you have the following set up:

- [Node.js](https://nodejs.org/en/) (v18.16.0 or higher)
- `npm` or `yarn`
- macOS, Linux, or Windows
- A Wix Developer account - [Sign up here](https://users.wix.com/signin?loginDialogContext=signup&referralInfo=HEADER&postLogin=https:%2F%2Fdev.wix.com%2Fdc3%2Fmy-apps&postSignUp=https:%2F%2Fdev.wix.com%2Fdc3%2Fmy-apps&forceRender=true)
- A [Mixpanel](https://mixpanel.com/analysis) project

## Create Mixpanel Analytics App 

#### npm

```bash
npm create @wix/app@latest -- -t git@github.com:wix/cli-app-templates.git -tp /mixpanel-analytics/template
```

#### yarn

```bash
yarn create @wix/app -t git@github.com:wix/cli-app-templates.git -tp /mixpanel-analytics/template
```

After the app was created, permissions needs to be assigned so the app could access embeds API:

Please add permissions as shown below:

![Embeds Permissions](./images/permissions.png)