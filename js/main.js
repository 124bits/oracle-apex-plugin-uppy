/*
 * Oracle APEX Plugin
 * author: Fernando D. Richter
 * version: v1.0.0
 * uppy version: v3.3.0
 * license: MIT
 */

const component = {
  init: function () {
    // get plugin object
    const action = this.action
    // get pluigin ajax identifier
    const ajaxIdentifier = action.ajaxIdentifier
    // get plugin attributes
    const restrictions        = JSON.parse(action.attribute01)
    const dashboardOptions    = JSON.parse(action.attribute02)
    const imageEditor         = (action.attribute03 === 'Y')
    const targetElement       = action.attribute04
    const additionalFeatures  = action.attribute05 || 'empty'
    const usePresignUrl       = (action.attribute07 === 'Y')
    const theme               = action.attribute08
    const onCompleteCallback  = action.attribute09
    const localePack          = action.attribute10
    const destination         = action.attribute11
    const uppyId              = action.attribute12 || Date.now()
    const uploadLinkObjectKey = action.attribute13
    // uppy code
    const uppy = new Uppy.Uppy({
      autoProceed: false,
      locale: Uppy.locales[localePack],
      id: uppyId,
      restrictions,
    })
    
    uppy.use(Uppy.Dashboard, {
      proudlyDisplayPoweredByUppy: false,
      target: targetElement,
      allowMultipleUploads: true,
      inline: true,
      replaceTargetContent: true,
      showProgressDetails: true,
      theme,
      browserBackButtonClose: false,
      hideUploadButton: false,
      hideProgressAfterFinish: true,
      ...dashboardOptions,
    })

    imageEditor && 
    uppy.use(Uppy.ImageEditor, { target: Uppy.Dashboard })
    
    additionalFeatures.search('AUDIO') >= 0 &&
    uppy.use(Uppy.Audio, {target: Uppy.Dashboard, showAudioSourceDropdown: true})
    
    additionalFeatures.search('WEBCAM') >= 0 &&
    uppy.use(Uppy.Webcam, {target: Uppy.Dashboard, showVideoSourceDropdown: true})

    additionalFeatures.search('SCREEN_CAPTURE') >= 0 &&
    uppy.use(Uppy.ScreenCapture, { target: Uppy.Dashboard })

    destination === 'AwsS3' &&
    uppy.use(Uppy[destination], {
      async getUploadParameters (file) {
        let uploadParameters

        if (usePresignUrl) {
          await apex.server.plugin(
            ajaxIdentifier,
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
          url: uploadParameters[uploadLinkObjectKey],
          fields: uploadParameters,
          headers: {"Content-Type": `${file.type}; charset=utf-8`},
        }
      }
    })

    uppy.on('complete', eval(onCompleteCallback))

    return uppy
  }
}
