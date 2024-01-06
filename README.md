# Oracle APEX Dynamic Action Plugin - Uppy file uploader

[![APEX Community](https://cdn.rawgit.com/Dani3lSun/apex-github-badges/78c5adbe/badges/apex-community-badge.svg)](https://github.com/Dani3lSun/apex-github-badges) [![APEX Plugin](https://cdn.rawgit.com/Dani3lSun/apex-github-badges/b7e95341/badges/apex-plugin-badge.svg)](https://github.com/Dani3lSun/apex-github-badges)
[![APEX Built with Love](https://cdn.rawgit.com/Dani3lSun/apex-github-badges/7919f913/badges/apex-love-badge.svg)](https://github.com/Dani3lSun/apex-github-badges)

Oracle Apex Plugin to integrate with Uppy file uploader.

## Install
- Import plugin file `dynamic_action_plugin_uppy.sql` from `src` directory into your application

## Plugin Settings
The plugin settings are highly customizable and you can change:
- **Theme** - Uppy theme (Light, Dark and Auto);
- **Locale Pack** - You can use a locale pack to translate Uppy into your language of choice (default English);
- **Restrictions** - Optionally, [restrictions](https://uppy.io/docs/uppy/#restrictions) provide rules and conditions to limit the type and/or number of files that can be selected;
- **Dashboard Options** - The Dashboard can be extensively customized by configuring the [options](https://uppy.io/docs/dashboard/#Options);
- **Target Element** - Target to render Uppy Plugin (reference to a html element id or class);
- **Additional Features** - Enable Audio, Webcam, screen Capture sources, Enable Image Editor, Compress Images, Include Header "Content-Disposition attachment;" on upload process, Golden Retriever;
- **Compressor Options** - Check for Compressor options [here](https://github.com/fengyuanchen/compressorjs#options);
- **Destinations** - You can choose different upload destinations. For now, only avaliable `AWS S3 / Cloudflare R2`;
- **Use Presinged URL Method** - Enable Uppy to use a presigned generated URL;
- **Presigned URL Ajax PL/SQL Function** - PL/SQL function that will return the presigned URL object key. It must return a JSON object;
- **Upload Link Object Key** - Define the upload object key returned from Presigned URL Ajax PL/SQL Function;
- **On Complete Callback Function** - Allow users to define the callback function fired when all uploads are completed;
- **On Upload Success** - Allow users to define the callback function fired when an upload is completed successfully;
- **Initialization JavaScript Function** - Allow users to define the callback function fired when Uppy is initialized;
- **Uppy ID** - Define a site-wide unique ID for the Uppy instance. If several Uppy instances are being used, for instance, on two different pages, an id should be specified. This allows Uppy to store information in localStorage without colliding with other Uppy instances.

## How to use
- Create a new Dynamic Action with event `Page Load`.
- As action choose `124BITS - Uppy File Uploader`.
- Choose best fitting plugin attributes (help included)

## Uppy Library (v3.21.0)
- The plug-in is built on top of the open source [Uppy](https://uppy.io/) javascript library.
- Uppy is a sleek, modular JavaScript file uploader that integrates seamlessly with any application. It’s fast, has a comprehensible API and lets you worry about more important problems than building a file uploader.

## Demo Application
Coming soon!

## Preview
## ![](https://github.com/124bits/oracle-apex-plugin-uppy/blob/main/img/uppy-plugin-settings.png?raw=true)