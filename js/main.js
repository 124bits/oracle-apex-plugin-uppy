/*
 * Oracle APEX Plugin
 * author: Fernando D. Richter
 * version: v1.0.1
 * uppy version: v3.21.0
 * license: MIT
 */

const UPPY = window.UPPY || {};
UPPY.plugin = UPPY.plugin || {};

UPPY.plugin.init = (context, initFn) => {
  const { action } = context;
  const plugin = {
    ajaxIdentifier: action.ajaxIdentifier,
    restrictions: JSON.parse(action.attribute01),
    dashboardOptions: JSON.parse(action.attribute02),
    targetElement: action.attribute04,
    additionalFeatures: action.attribute05 || 'empty',
    usePresignUrl: (action.attribute07 === 'Y'),
    theme: action.attribute08,
    onCompleteCallback: action.attribute09,
    localePack: action.attribute10,
    destination: action.attribute11,
    uppyId: action.attribute12 || Date.now(),
    uploadLinkObjectKey: action.attribute13,
    onUploadSuccess: action.attribute14,
    compressOptions: JSON.parse(action.attribute15),
  };

  const uppy = new Uppy.Uppy({
    locale: Uppy.locales[plugin.localePack],
    id: plugin.uppyId,
    restrictions: plugin.restrictions,
  });

  uppy.use(Uppy.Dashboard, {
    proudlyDisplayPoweredByUppy: false,
    target: plugin.targetElement,
    inline: true,
    showProgressDetails: true,
    theme: plugin.theme,
    hideProgressAfterFinish: true,
    ...plugin.dashboardOptions,
  });

  const addFeature = (feature, UppyComponent, options = {}) => {
    if (plugin.additionalFeatures.includes(feature)) {
      uppy.use(UppyComponent, options);
    }
  };

  addFeature('COMPRESS_IMAGES', Uppy.Compressor, { ...plugin.compressOptions });
  addFeature('IMAGE_EDITOR', Uppy.ImageEditor, { target: Uppy.Dashboard });
  addFeature('AUDIO', Uppy.Audio, { target: Uppy.Dashboard, showAudioSourceDropdown: true });
  addFeature('WEBCAM', Uppy.Webcam, { target: Uppy.Dashboard, showVideoSourceDropdown: true });
  addFeature('SCREEN_CAPTURE', Uppy.ScreenCapture, { target: Uppy.Dashboard });
  addFeature('GOLDEN_RETRIEVER', Uppy.GoldenRetriever, { serviceWorker: true });

  if (plugin.destination === 'AwsS3') {
    uppy.use(Uppy[plugin.destination], {
      async getUploadParameters(file) {
        let uploadParameters;
        if (plugin.usePresignUrl) {
          await apex.server.plugin(plugin.ajaxIdentifier, {
            x01: file.name,
            x02: file.type,
            x03: file.extension,
            x04: file.size,
          }, { success: (data) => uploadParameters = data });
        }

        const headers = {
          "Content-Type": `${file.type}; charset=utf-8`,
          ...(plugin.additionalFeatures.includes('ATTACHMENT') && { "Content-Disposition": `attachment; filename="${file.name}"` }),
        };

        return {
          method: 'put',
          url: uploadParameters[plugin.uploadLinkObjectKey],
          fields: uploadParameters,
          headers,
        };
      }
    });
  }

  uppy.on('upload-success', eval(plugin.onUploadSuccess));
  uppy.on('complete', eval(plugin.onCompleteCallback));

  if (typeof initFn === 'function') {
    initFn.call(context, uppy);
  }

  return uppy;
};
