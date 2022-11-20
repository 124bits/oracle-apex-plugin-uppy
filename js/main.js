/*
 * Oracle APEX Plugin
 * author: Fernando D. Richter
 * version: v1.0.0
 * uppy version: v3.3.1
 * license: MIT
 */

const component = {
  init: function () {
    // get plugin object
    const action = this.action
    // get plugin attributes
    const plugin = {
      ajaxIdentifier: action.ajaxIdentifier,
      restrictions: JSON.parse(action.attribute01),
      dashboardOptions: JSON.parse(action.attribute02),
      imageEditor: (action.attribute03 === 'Y'),
      targetElement: action.attribute04,
      additionalFeatures: action.attribute05 || 'empty',
      usePresignUrl: (action.attribute07 === 'Y'),
      theme: action.attribute08,
      onCompleteCallback: action.attribute09,
      localePack: action.attribute10,
      destination: action.attribute11,
      uppyId: action.attribute12 || Date.now(),
      uploadLinkObjectKey: action.attribute13,
    }
    // uppy code
    const uppy = new Uppy.Uppy({
      autoProceed: false,
      locale: Uppy.locales[plugin.localePack],
      id: plugin.uppyId,
      restrictions: plugin.restrictions,
    })
    
    uppy.use(Uppy.Dashboard, {
      proudlyDisplayPoweredByUppy: false,
      target: plugin.targetElement,
      allowMultipleUploads: true,
      inline: true,
      replaceTargetContent: true,
      showProgressDetails: true,
      theme: plugin.theme,
      browserBackButtonClose: false,
      hideUploadButton: false,
      hideProgressAfterFinish: true,
      ...plugin.dashboardOptions,
    })

    plugin.imageEditor && 
    uppy.use(Uppy.ImageEditor, { target: Uppy.Dashboard })
    
    plugin.additionalFeatures.search('AUDIO') >= 0 &&
    uppy.use(Uppy.Audio, {target: Uppy.Dashboard, showAudioSourceDropdown: true})
    
    plugin.additionalFeatures.search('WEBCAM') >= 0 &&
    uppy.use(Uppy.Webcam, {target: Uppy.Dashboard, showVideoSourceDropdown: true})

    plugin.additionalFeatures.search('SCREEN_CAPTURE') >= 0 &&
    uppy.use(Uppy.ScreenCapture, { target: Uppy.Dashboard })

    plugin.destination === 'AwsS3' &&
    uppy.use(Uppy[plugin.destination], {
      async getUploadParameters (file) {
        let uploadParameters
        if (plugin.usePresignUrl) {
          await apex.server.plugin(
            plugin.ajaxIdentifier,
            {
              x01: file.name,
              x02: file.type,
              x03: file.extension,
              x04: file.size,
            }, 
            {
              success: (data) => uploadParameters = data
            }
          )
        }
        return {
          method: 'put',
          url: uploadParameters[plugin.uploadLinkObjectKey],
          fields: uploadParameters,
          headers: {"Content-Type": `${file.type}; charset=utf-8`},
        }
      }
    })

    uppy.on('complete', eval(plugin.onCompleteCallback))
    return uppy
  }
}
