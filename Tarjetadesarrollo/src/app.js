// app.js - Configuración limpia y mínima
const onxrloaded = () => {
  XR8.XrController.configure({
    imageTargetData: [
      require('../image-targets/Frame1.json'),
    ],
  })
  XR8.addCameraPipelineModule(LandingPage.pipelineModule())
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)