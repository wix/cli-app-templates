# Wix CLI App Template: Stock Countdown

The Stock Countdown Wix app template is part of the [Wix app template collection](https://dev.wix.com/apps-templates).

This Wix CLI template demonstrates how to build a [site plugin](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/site-extensions/site-plugins/add-a-site-plugin-extension-in-the-cli) for the Wix Stores product page. The Stock Countdown plugin displays the number of remaining items in stock, which it retrieves using the Wix Stores [Inventory API](https://dev.wix.com/docs/sdk/backend-modules/stores/inventory/introduction). 

The template also demonstrates the basic functionality of the Site Window SDK, the React SDK, the Editor SDK, and the Wix Design System.

> **Note:** This app is intended for Wix sites with the Wix Stores app installed. For it to function correctly, the site owner must [install the Wix Stores app](https://www.wix.com/app-market/wix-stores) from the app market.

## About Wix app templates

[Wix apps](https://dev.wix.com/docs/build-apps) enhance the functionality of Wix sites by adding new features such as custom pages, dashboard components, third-party integrations, or site analytics. Starting with an app template fast-tracks the development process, providing a working foundational app that developers can modify and build upon. This approach saves valuable time, allowing for a quick transition from concept to a fully functional app.

Learn more about [Wix app templates](https://dev.wix.com/docs/build-apps/get-started/templates/get-started-from-an-app-template) and explore our growing [template collection](https://dev.wix.com/apps-templates).

## Template features

This Wix app template incorporates the following features:

+ **Wix CLI:** Get a comprehensive developer experience with minimal setup and host your app on Wix with one command. Learn more about the [Wix CLI for apps](https://dev.wix.com/docs/build-apps/developer-tools/cli/get-started/about-the-wix-cli-for-apps).
+ **Wix Design System:** Utilize Wix's reusable React components for a cohesive user experience consistent with Wix's design standards.
+ **Wix Editor API**: Integrate panels with the Wix editor.
+ **Wix Site Window API**: Contains functionality for working with the browser window.
+ **Wix Stores API**: Access and manage Wix Stores data on a Wix site. Learn more about the [Wix Stores SDK](https://dev.wix.com/docs/sdk/backend-modules/stores/inventory/introduction).

## Prerequisites

Before getting started, make sure you have the following set up:

+ [Node.js](https://nodejs.org/en/) (v18.16.0 or higher)
+ [A Wix developer account](https://users.wix.com/signin?loginDialogContext=signup&referralInfo=HEADER&postLogin=https:%2F%2Fdev.wix.com%2Fdc3%2Fmy-apps&postSignUp=https:%2F%2Fdev.wix.com%2Fdc3%2Fmy-apps&forceRender=true)

## Local Development

We first need to create local files for our app project and set up a local development environment for preview and testing.

## Step 1 | Create a new app project with the Chart Widget template

In the directory where you want to create your project, run the following command:

```bash
npm create @wix/app@latest -- -t 2ff7a5ae-d116-4c06-9394-7d7493428d0e
```

In the creation process, you will be asked for:

+ A **Wix app name**. This is the name of your app in the [App Dashboard](https://dev.wix.com/app-selector?title=Select+an+App&primaryButtonText=Select+Site&actionUrl=https%3A%2F%2Fdev.wix.com%2Fapps%2F%7BappId%7D%2Fhome).
+ A site to install and test your app on. You can select an existing site or create a new [development site](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/get-started/quick-start#development-site).
+ A **package name**. This is the name of the package created locally for your project, and the name of the directory containing your project’s local files.

### What you get

This process registers a new app in the App Dashboard with the required permissions pre-configured, and it generates a new app project in your local file system. The project contains all the files your app needs to run locally and in production.

The project includes:

+ Initial boilerplate code for a simple app with a site plugin extension.
+ A `package.json` file with your app’s dependencies.

## Step 2 | Test the app

### Install the Wix Stores App

This app makes calls to the Wix Stores [Inventory API](https://dev.wix.com/docs/sdk/backend-modules/stores/inventory/introduction) to retrieve the number of items in stock. Before you can test this app on your development site, you must first install the [Wix Stores app](https://www.wix.com/app-market/wix-stores).

### Set up a local development environment

The app creation process installs the app on your chosen development site. However, you won’t see the app extensions on your site until you build the app and release a version. To test the app during development:

Set up a local development environment using the following command:

```bash
npm run dev
```

The development environment is set up for hot reloading, so any changes you make to your code will be reflected in the browser.

### Testing Steps

1. After setting up the local development environment, the CLI will prompt you with a menu. Press **E** to open a browser window with your site editor in your local development environment. 

1. In the editor, navigate to your **Products** page, then find the widget containing the plugin slot as shown in the image below. Learn more about [plugin slots](https://dev.wix.com/docs/build-apps/develop-your-app/extensions/site-extensions/site-plugins/supported-wix-app-pages/about-slots). 

1. Click on the widget and then click on the **plug icon** to open the plugin explorer.

    ![Product page add plugin](./images/cli-stock-counter-add-plugin.png)

1. Find your plugin in the plugin explorer and click **Add** to add it to the slot.

    ![Plugin explorer](./images/cli-stock-counter-plugin-explorer.png)

1. Publish your site.
1. Return to the CLI menu and select the option to view your site plugin on your site. This will open your site in the local development environment.
1. Navigate to a product page. Your plugin should be visible in the slot.

## Extend and customize the app

The template is designed for easy customization and extension. Here are some suggested entry points where you can add your own custom logic or functionality:

### Site plugin panel customization

The site plugin's panel uses the [Wix Design System](https://www.wixdesignsystem.com/) and [Wix Editor SDK](https://dev.wix.com/docs/sdk/host-modules/editor/introduction) to create an interface that allows the user to select a stock threshold below which the counter will be displayed.

Customize the panel to add more settings or change the appearance.

**Development entry point**: [`template/src/site/plugins/custom-elements/stock-counter/panel.tsx`](template/src/site/widgets/custom-elements/stock-counter/panel.tsx)

### Site plugin logic customization

The site plugin is defined in a `CustomElement` React component. The `plugin.tsx` file serves as the entry point for the custom element component that will be rendered on the user's site. 

Currently the component uses the inventory API to retrieve inventory information.

Customize the component to implement custom logic, change the functionality, and customize the appearance.

**Development entry point**: [`template/src/site/plugins/custom-elements/stock-counter/plugin.tsx`](template/src/site/plugins/custom-elements/stock-counter/plugin.tsx)

## Deployment

After the app is created you can build it, which allows you to:

+ Create a preview to share with others
+ Release new versions of your app in the App Dashboard.

### Build the app

To build the app, run the following command:

```bash
npm run build
```

### Preview the app

You can create an online preview of your built app using the following command:

```bash
npm run preview
```

This command provides an inline link to an app preview URL.

You can share this URL with collaborators on your development site. It directs to a page where they can preview and test your app.

### Release an app version

An app version allows you to publish an app to the Wix App Market or install it on a site with a direct install URL.

To release an app version, run the following command:

```bash
npm run release
```

This guides you through releasing a new app version in the Wix Developers Center. Once the app version is released, you may consider different [distribution options](https://dev.wix.com/docs/build-apps/launch-your-app/app-distribution/about-app-distribution).

## Learn more

For more information:

+ Learn more about [Wix app templates](https://dev.wix.com/docs/build-apps/get-started/templates/get-started-from-an-app-template).
+ Check out our [full collection of app templates](https://dev.wix.com/apps-templates).
+ See our documentation for details about [building Wix apps](https://dev.wix.com/docs/build-apps).
