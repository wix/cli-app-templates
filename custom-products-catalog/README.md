# Wix CLI App Template: Custom Products Catalog

The Custom Products Catalog Wix app template is part of the [Wix app templates collection](https://dev.wix.com/apps-templates).

This Wix CLI template demonstrates the use of the [Wix Stores Products API](https://dev.wix.com/docs/sdk/api-reference/stores/products/introduction) to add or remove products. It is an excellent starting point if you plan on using Wix APIs to manage a site’s business data. Using the React SDK and the Dashboard React SDK, you can apply any of the methods found across our Wix APIs and easily manage them in a Dashboard page pre-built following the Wix Design System.

The template handles basic Wix Stores functionalities, laying the groundwork for further customization and development.

> **Note:** This app is intended for Wix sites with the Wix Stores app installed. For it to function correctly, the site owner must [install the Wix Stores app](https://www.wix.com/app-market/wix-stores) from the app market.

## About Wix app templates

[Wix apps](https://dev.wix.com/docs/build-apps) enhance the functionality of Wix sites by adding new features such as custom pages, dashboard components, third-party integrations, or site analytics. Starting with an app template fast-tracks the development process, providing a working foundational app that developers can modify and build upon. This approach saves valuable time, allowing for a quick transition from concept to a fully functional app.

Learn more about [Wix app templates](https://dev.wix.com/docs/build-apps/get-started/templates/get-started-from-an-app-template) and explore our growing [template collection](https://dev.wix.com/apps-templates).

## Template features

This Wix app template incorporates the following features:

+ **Wix CLI:** Get a comprehensive developer experience with minimal setup and host your app on Wix with 1 command. Learn more about the [Wix CLI for apps](https://dev.wix.com/docs/build-apps/developer-tools/cli/get-started/about-the-wix-cli-for-apps).
+ **Wix Design System:** Utilize Wix's reusable React components for a cohesive user experience consistent with Wix's design standards.
+ **Wix React SDK:** Simplify API requests to the Wix ecosystem.
+ **Wix Dashboard React SDK:** Integrate custom dashboard components with the Wix site dashboard.
+ **Wix Stores Products API:** Integrate custom logic for managing a store's products.

## Prerequisites

Before getting started, make sure you have the following set up:

+ [Node.js](https://nodejs.org/en/) (v18.16.0 or higher)
+ [A Wix developer account](https://users.wix.com/signin?loginDialogContext=signup&referralInfo=HEADER&postLogin=https:%2F%2Fdev.wix.com%2Fdc3%2Fmy-apps&postSignUp=https:%2F%2Fdev.wix.com%2Fdc3%2Fmy-apps&forceRender=true)

## Local Development

We first need to create local files for our app project and set up a local development environment for preview and testing.

## Step 1 | Create a new app project with the Custom Products Catalog template

Run the following command to create a new app project using this template:

```bash
npm create @wix/app@latest -- --template 24493a0d-18f2-4f68-b6d5-55992cef7daa
```

In the creation process, you will be asked for a Wix app name and a package name for your project.

+ The Wix app name is the name that appears for your app in the [Wix Dev Center](https://dev.wix.com/apps/my-apps).
+ The package name is the name of the package created locally for your project, and the name of the directory containing your project’s local files.

### What you get

This process registers a new app in the Wix Dev Center with the required permissions pre-configured, and it generates a new app project in your local file system. The project contains all the files your app needs to run locally and in production.

The project includes:

+ Initial boilerplate code for a simple app with a [dashboard page](https://dev.wix.com/docs/build-apps/developer-tools/cli/wix-cli-for-apps/extensions/dashboard-pages) and a [dashboard modal](https://dev.wix.com/docs/build-apps/developer-tools/extensions/dashboard-modal-extensions).
+ [Wix Stores Products API](https://dev.wix.com/docs/sdk/api-reference/stores/products/introduction) integration, with methods for querying, creating, and deleting products.
+ A `package.json` file with your app's dependencies.

## Step 2 | Test the app

The app creation process installs the app on your chosen development site. However, there is still some configuration required before your app will function.

### Install the Wix Stores App

This app makes calls to the Wix Stores Products API to create and manage the store products. Before you can test this app on your development site, you must first install the Wix Stores app.

### Set up a local development environment

You won’t see the app extensions on your development site until you build the app and create a version. To test the app during development, set up a local development environment using the following command.

```bash
npm run dev
```

This will prompt you with the following CLI menu:

```bash
Press a number key to open a dashboard page:
› 1 - Custom Products Catalog (/)
```

Type `1` to open a browser window with a preview of the app's dashboard page.

The development environment is set up for hot reloading, so any changes you make to your code will be reflected in the browser.

## Extend and customize the app

The template is designed for easy customization and extension. Here are some suggested entry points where you can add your own custom logic or functionality:

### Dashboard page customization

The dashboard page is pre-integrated with the [Wix Design System](https://www.wixdesignsystem.com/).

It utilizes the [Wix Stores Products API](https://dev.wix.com/docs/sdk/api-reference/stores/products/introduction) to:

+ Query and present a list of the products in the store.
+ Delete selected products from the store.

Customize the dashboard page to fit your specific needs, whether it's updating the UI or adding new features.

**Development entry point:** [`template/src/dashboard/pages/page.tsx`](./template/scr/dashboard/pages/page.tsx)

This file contains the parent component for the dashboard interface. It uses the hook functions defined in [`template/src/dashboard/hooks/stores.ts`](./template/src/dashboard/hooks/stores.ts) to make Wix Stores Products API calls. It's a prime location for extending the dashboard functionality or integrating additional services.

### Modal component customization

The modal component page is pre-integrated with the [Wix Design System](https://www.wixdesignsystem.com/).

It defines a modal that opens up on top of your dashboard page.

It utilizes the [Wix Stores Products API](https://dev.wix.com/docs/sdk/api-reference/stores/products/introduction) to allow you to create a new product in the store.

Customize this modal to allow more complete product creation, with details such as price, images, etc.

**Development entry point:** [`template/src/dashboard/components/create-product.tsx`](./template/src/dashboard/components/create-product.tsx)

This file contains the parent component for the modal. It uses the hook functions defined in [`template/src/dashboard/hooks/stores.ts`](./template/src/dashboard/hooks/stores.ts) to make Wix Stores Products API calls. It's a prime location for extending the modal functionality.

## Deployment

After the app is created you can build it, which allows you to:

+ Create a preview to share with others.
+ Create new versions of your app on the Developers Center.

### Build the app

To build the app, run one of the following:

```bash
npm run build
```

### Preview the app

You can create an online preview of your built app using the following command:

```bash
npm run preview
```

This command provides an inline link to an app preview URL.

You can share this URL with collaborators on your development site. It directs to a dashboard page where they can preview and test your app.

### Create an app version

An app version allows you to publish an app to the [Wix App Market](https://www.wix.com/app-market) or install it on a site with a direct install URL.

To create an app version, run the following command:

```bash
npm run release
```

This guides you through creating a new app version in the Wix Developers Center. Once the app version is created, you can optionally [submit it for review](https://devforum.wix.com/kb/en/article/submit-your-app-for-review) and publish it to the [Wix App Market](https://www.wix.com/app-market).

To learn more about app versions, see [App Versions and Deployment](../workflow/app_versions_and_deployment.md).

## Learn more

For more information:

+ Learn more about [Wix app templates](https://dev.wix.com/docs/build-apps/get-started/templates/get-started-from-an-app-template).
+ Check out our [full collection of app templates](https://dev.wix.com/apps-templates).
+ See our documentation for details about [building Wix apps](https://dev.wix.com/docs/build-apps).
