import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Open URL UI Button',
  schema: {
    // @label Destination URL
    url: ecs.string,
    // @label Open in New Tab
    openInNewTab: ecs.boolean,
  },
  schemaDefaults: {
    url: 'https://www.google.com',
    openInNewTab: true,
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .onEnter(() => {
        world.events.addListener(eid, ecs.input.UI_CLICK, () => {
          const {url, openInNewTab} = schemaAttribute.get(eid)

          if (!url || url.trim() === '') {
            console.warn('OpenUrlButton: No se especificó ninguna URL válida.')
            return
          }

          if (openInNewTab) {
            window.open(url, '_blank', 'noopener,noreferrer')
          } else {
            window.location.href = url
          }
        })
      })
  },
})