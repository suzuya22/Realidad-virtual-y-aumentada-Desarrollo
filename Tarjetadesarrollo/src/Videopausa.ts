import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Play Pause Video UI Button',
  schema: {
    // @required
    // @label Video Entity
    videoPlayer: ecs.eid,
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .onEnter(() => {
        world.events.addListener(eid, ecs.input.UI_CLICK, () => {
          const {videoPlayer} = schemaAttribute.get(eid)

          if (!videoPlayer || !ecs.VideoControls.has(world, videoPlayer)) {
            console.warn('PlayPauseButton: No se encontró la entidad con VideoControls.')
            return
          }

          // 1. Mutar el estado del video (Play / Pause)
          ecs.VideoControls.mutate(world, videoPlayer, (cursor) => {
            cursor.paused = !cursor.paused

            // 2. Ajustar visibilidad del botón según el nuevo estado del video
            if (ecs.Ui.has(world, eid)) {
              ecs.Ui.mutate(world, eid, (uiCursor) => {
                // Si el video quedó pausado, mostramos el botón (opacidad 1)
                // Si el video se está reproduciendo, ocultamos el botón (opacidad 0)
                uiCursor.opacity = cursor.paused ? 1 : 0
              })
            }
          })
        })
      })
  },
})