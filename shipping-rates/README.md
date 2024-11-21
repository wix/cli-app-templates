# Wix CLI App Template: Shipping Rates

The Shipping Rates Wix app template is part of the [Wix app template collection](https://dev.wix.com/apps-templates?filter=cli).

This Wix CLI template demonstrates how to build a [service plugin](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/backend-extensions/service-plugins/add-service-plugin-extensions-with-the-cli) for the Wix eCom [shipping rates](https://dev.wix.com/docs/sdk/backend-modules/ecom/service-plugins/shipping-rates/introduction), and create a [backend API](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/backend-extensions/api/add-api-extensions-with-the-cli) to fetch data.

This template also demonstrates how to build dashboard pages, dashboard modals and using the Wix SDKs to fetch data about the and the store orders.

> **Note:** This app is intended for Wix sites with the Wix Stores app installed. For it to function correctly, the site owner must [install the Wix Stores app](https://www.wix.com/app-market/wix-stores) from the app market.

## About Wix app templates

[Wix apps](https://dev.wix.com/docs/build-apps) enhance the functionality of Wix sites by adding new features such as custom pages, dashboard components, third-party integrations, service plugin and your own backened API. Starting with an app template fast-tracks the development process, providing a working foundational app that developers can modify and build upon. This approach saves valuable time, allowing for a quick transition from concept to a fully functional app.

Learn more about [Wix app templates](https://dev.wix.com/docs/build-apps/get-started/templates/get-started-from-an-app-template) and explore our growing [template collection](https://dev.wix.com/apps-templates?filter=cli).

## Template features

This Wix app template incorporates the following features:

- **Wix CLI:** Get a comprehensive developer experience with minimal setup and host your app on Wix with one command. Learn more about the [Wix CLI for apps](https://dev.wix.com/docs/build-apps/developer-tools/cli/get-started/about-the-wix-cli-for-apps).
- **Wix Design System:** Utilize Wix's reusable React components for a cohesive user experience consistent with Wix's design standards.
- **Wix Ecom API**: Access and manage Wix Stores data on a Wix site. Learn more about the [Wix Stores SDK](https://dev.wix.com/docs/sdk/backend-modules/ecom/introduction).
- **Backend API**: Create your own HTTP serverless function that runs on Wix's infrastructure. Read more about [Backend APIs](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/backend-extensions/api/add-api-extensions-with-the-cli).
- **Service Plugins**: Integrate with Wix process i.e Shipping rates.
- **App Free Trial**: Learn how to integrate with Wix app market Free Trial. Read more about [free trials](https://dev.wix.com/docs/build-apps/launch-your-app/pricing-and-billing/set-up-and-manage-free-trials).

## Prerequisites

Before getting started, make sure you have the following set up:

- [Node.js](https://nodejs.org/en/) (v18.16.0 or higher)
- [A Wix developer account](https://users.wix.com/signin?loginDialogContext=signup&referralInfo=HEADER&postLogin=https:%2F%2Fdev.wix.com%2Fdc3%2Fmy-apps&postSignUp=https:%2F%2Fdev.wix.com%2Fdc3%2Fmy-apps&forceRender=true)

## Local Development

We first need to create local files for our app project and set up a local development environment for preview and testing.

## Step 1 | Create a new app project with the Shipping Rates template

In the directory where you want to create your project, run the following command:

```bash
npm create @wix/app@latest -- -t a033018e-233a-4ddc-8471-1151d8974866
```

When asked what you would like to create, choose **A new Wix App**.

In the creation process, you will be asked for:

- A **Wix app name**. This is the name of your app in the [App Dashboard](https://dev.wix.com/app-selector?title=Select+an+App&primaryButtonText=Select+Site&actionUrl=https%3A%2F%2Fdev.wix.com%2Fapps%2F%7BappId%7D%2Fhome).
- A **package name**. This is the name of the package created locally for your project, and the name of the directory containing your project’s local files.

### What you get

This process registers a new app in the App Dashboard with the required permissions pre-configured, and it generates a new app project in your local file system. The project contains all the files your app needs to run locally and in production.

The project includes:

- Initial boilerplate code for a simple app with a site plugin extension.
- A `package.json` file with your app’s dependencies.

## Step 2 | Test the app

### Install the Wix Stores App

This app makes calls to the Wix Ecom [Orders API](https://dev.wix.com/docs/sdk/backend-modules/ecom/orders/setup) to retrieve latest orders made in the store. Before you can test this app on your development site, you must first install the [Wix Stores app](https://www.wix.com/app-market/wix-stores).

### Set up a local development environment

The app creation process installs the app on your chosen development site. However, you won’t see the app extensions on your site until you build the app and create a version. To test the app during development:

Set up a local development environment using the following command:

```bash
npm run dev
```

The development environment is set up for hot reloading, so any changes you make to your code will be reflected in the browser.

### Testing Steps

1. After setting up the local development environment, the CLI will prompt you with a menu. Press **D** to open a browser window with your site dashboard in your local development environment.
1. Notice the newly created dashboard page and follow the plugin activation steps
1. Press **S** to open you site in your browser
1. Add an item to the cart and go to the Cart page
1. When opening the delivery options you will see a new "Standard Delivery" method that will implement settings in the dashboard page you've configured before.

## Extend and customize the app

The template is designed for easy customization and extension. Here are some suggested entry points where you can add your own custom logic or functionality:

### Backend API

Add your own database to be able to save the user's shipping rates configuration.

### Service Plugin

Use a different service plugin or modify the logic we use to calcuate the shipping rates.

## Deployment

After the app is created you can build it, which allows you to:

- Create a preview to share with others
- Create new versions of your app in the App Dashboard.

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

### Create an app version

An app version allows you to publish an app to the Wix App Market or install it on a site with a direct install URL.

To create an app version, run the following command:

```bash
npm run create-version
```

This guides you through creating a new app version in the Wix Developers Center. Once the app version is created, you can optionally [submit it for review](https://devforum.wix.com/kb/en/article/submit-your-app-for-review) and publish it to the [Wix App Market](https://www.wix.com/app-market).

## Learn more

For more information:

- Learn more about [Wix app templates](https://dev.wix.com/docs/build-apps/get-started/templates/get-started-from-an-app-template).
- Check out our [full collection of app templates](https://dev.wix.com/apps-templates?filter=cli).
- See our documentation for details about [building Wix apps](https://dev.wix.com/docs/build-apps).
