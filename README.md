# Oracle APEX Dynamic Action Plugin - Uppy file uploader

[![APEX Community](https://cdn.rawgit.com/Dani3lSun/apex-github-badges/78c5adbe/badges/apex-community-badge.svg)](https://github.com/Dani3lSun/apex-github-badges) [![APEX Plugin](https://cdn.rawgit.com/Dani3lSun/apex-github-badges/b7e95341/badges/apex-plugin-badge.svg)](https://github.com/Dani3lSun/apex-github-badges)
[![APEX Built with Love](https://cdn.rawgit.com/Dani3lSun/apex-github-badges/7919f913/badges/apex-love-badge.svg)](https://github.com/Dani3lSun/apex-github-badges)

Oracle Apex Plugin to integrate with Uppy file uploader.

## Install
- Import plugin file `dynamic_action_plugin_uppy.sql` from `src` directory into your application

## Plugin Settings
The plugin settings are highly customizable and you can change:
- **Theme** - Uppy theme (Light, Dark and Auto).
- **Locale Pack** - You can use a locale pack to translate Uppy into your language of choice (default English).
- **Restrictions** - Optionally, [restrictions](https://uppy.io/docs/uppy/#restrictions) provide rules and conditions to limit the type and/or number of files that can be selected.
- **Dashboard Options** - The Dashboard can be extensively customized by configuring the [options](https://uppy.io/docs/dashboard/#Options).
- **Enable Image Editor** - Allows users to crop, rotate, zoom and flip images that are added to Uppy.
- **Compress Images** - Enable/Disable compress images option. Optimizes images (JPEG, PNG), saving on average up to 60% in size.
- **Compressor Options** - Check for Compressor options [here](https://github.com/fengyuanchen/compressorjs#options)
- **Target Element** - Target to render Uppy Plugin (reference to a html element id or class).
- **Additional Features** - Enable Audio, Webcam, and Screen Capture sources.
- **Destinations** - You can choose different upload destinations. For now, only avaliable `AWS S3 / Cloudflare R2`.
- **Use Presinged URL Method** - Enable Uppy to use a presigned generated URL.
- **Presigned URL Ajax PL/SQL Function** - PL/SQL function that will return the presigned URL object key. It must return a JSON object.
- **Upload Link Object Key** - Define the upload object key returned from Presigned URL Ajax PL/SQL Function.
- **On Complete Callback Function** - Allow users to define the callback function fired when all uploads are completed.
- **Uppy ID** - Define a site-wide unique ID for the Uppy instance. If several Uppy instances are being used, for instance, on two different pages, an id should be specified. This allows Uppy to store information in localStorage without colliding with other Uppy instances.

## How to use
- Create a new Dynamic Action with event `Page Load`.
- As action choose `124BITS - Uppy File Uploader`.
- Choose best fitting plugin attributes (help included)

## Uppy Library (v3.3.1)
- The plug-in is built on top of the open source [Uppy](https://uppy.io/) javascript library.
- Uppy is a sleek, modular JavaScript file uploader that integrates seamlessly with any application. It???s fast, has a comprehensible API and lets you worry about more important problems than building a file uploader.

## Demo Application
Coming soon!

## Preview
## ![](https://github.com/124bits/oracle-apex-plugin-uppy/blob/d3a32485d261f693e069d83d12998577f10fe31d/img/uppy-plugin-settings.png?raw=true)