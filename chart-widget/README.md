# Wix CLI App Template: Chart Widget

The Chart Widget Wix app template is part of the [Wix app template collection](https://dev.wix.com/apps-templates).

This Wix CLI template demonstrates how to use a [site widget](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/site-extensions/site-widgets/add-a-site-widget-extension-in-the-cli) extension to define a "chart" widget that can be added to a site once the app is installed. Site admins can customize the chart widget's characteristics, such as the chart type, data, text, and colors. This is an excellent starting point for building apps that use site widgets to add customizable features to a site.

The template also demonstrates the basic functionality of the React SDK, the Editor SDK, and the Wix Design System.

## About Wix app templates

[Wix apps](https://dev.wix.com/docs/build-apps) enhance the functionality of Wix sites by adding new features such as custom pages, dashboard components, third-party integrations, or site analytics. Starting with an app template fast-tracks the development process, providing a working foundational app that developers can modify and build upon. This approach saves valuable time, allowing for a quick transition from concept to a fully functional app.

Learn more about [Wix app templates](https://dev.wix.com/docs/build-apps/get-started/templates/get-started-from-an-app-template) and explore our growing [template collection](https://dev.wix.com/apps-templates).

## Template features

This Wix app template incorporates the following features:

+ **Wix CLI**: Get a comprehensive developer experience with minimal setup and host your app on Wix with 1 command. Learn more about the Wix CLI for  apps.
+ **Wix Design System**: Utilize Wix's reusable React components for a cohesive user experience consistent with Wix's design standards.
+ **Wix Editor SDK**: Integrate panels with the Wix editor.

## Prerequisites

Before getting started, make sure you have the following set up:

+ [Node.js](https://nodejs.org/en/) (v20.10.0 or higher)
+ [A Wix developer account](https://users.wix.com/signin?loginDialogContext=signup&referralInfo=HEADER&postLogin=https:%2F%2Fdev.wix.com%2Fdc3%2Fmy-apps&postSignUp=https:%2F%2Fdev.wix.com%2Fdc3%2Fmy-apps&forceRender=true)

## Local Development

We first need to create local files for our app project and set up a local development environment for preview and testing.

## Step 1 | Create a new app project with the Chart Widget template

In the directory where you want to create your project, run the following command:

```bash
npm create @wix/app@latest -- -t 5fcf03b8-46ba-499b-8dbb-40ecf811aceb
```

In the creation process, you will be asked for:

+ A **Wix app name**. This is the name of your app in the [Wix Dev Center](https://dev.wix.com/apps/my-apps).
+ A site to install and test your app on. You can select an existing site or create a new [development site](https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/get-started/quick-start#development-site).
+ A **package name**. This is the name of the package created locally for your project, and the name of the directory containing your project's local files.

### What you get

This process registers a new app in the Wix Dev Center and generates a new app project in your local file system. The project contains all the files your app needs to run locally and in production.

The project includes:

+ Initial boilerplate code for a simple app with a site widget extension.
+ A `package.json` file with your app's dependencies.

## Step 2 | Test the app

The app creation process installs the app on your chosen development site. However, you won't see the app extensions on your development site until you build the app and release a version. To test the app during development, set up a local development environment using the following command:

```bash
npm run dev
```

This will prompt you with a CLI menu. Follow the instructions to open a browser window with a preview of the app's site widget on a site page. The first time you run this command for a new site widget, you'll be prompted to open the site editor to complete the installation. 

The development environment is set up to automatically reflect your code changes in the browser.

### Customize the panel

The panel uses the [Wix Design System](https://www.wixdesignsystem.com/) and [Wix Editor SDK](https://dev.wix.com/docs/sdk/host-modules/editor/introduction) to provide a simple UI where users can edit their chart. It includes default options that define the chart's type, data, text, and color.

You can update these options to change the display of the chart widget on the user's site page. You can also customize the layout and appearance of the panel to fit your specific needs.

**Development entry point**: [`template/src/site/widgets/custom-elements/chart-widget/panel.tsx`](template/src/site/widgets/custom-elements/chart-widget/panel.tsx)

### Modify the site widget

The site widget is defined in a `CustomElement` React component. The `element.tsx` file serves as the entry point for the custom element component that will be rendered on the user's site. Alter the component to fit your needs. For example, you can change the component's appearance and options, such as adding support for another type of chart.

**Development entry point**: [`template/src/site/widgets/custom-elements/chart-widget/element.tsx`](template/src/site/widgets/custom-elements/chart-widget/element.tsx)

## Deployment

After the app is created you can build it, which allows you to:

+ Create a preview to share with others
+ Release new versions of your app on the Dev Center.

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

This guides you through releasing a new app version in your [app dashboard](https://dev.wix.com/apps/my-apps). Once the app version is released, you may consider different [distribution options](https://dev.wix.com/docs/build-apps/launch-your-app/app-distribution/about-app-distribution).

## Learn more

For more information:

+ Learn more about [Wix app templates](https://dev.wix.com/docs/build-apps/get-started/templates/get-started-from-an-app-template).
+ Check out our [full collection of app templates](https://dev.wix.com/apps-templates).
+ See our documentation for details about [building Wix apps](https://dev.wix.com/docs/build-apps).
