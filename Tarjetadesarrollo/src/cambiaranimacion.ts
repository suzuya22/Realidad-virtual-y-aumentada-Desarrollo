import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Toggle Animation UI Button',
  schema: {
    // @required
    // @label Character Entity
    character: ecs.eid,
    // @label First Animation Name
    anim1: ecs.string,
    // @label Second Animation Name
    anim2: ecs.string,
  },
  schemaDefaults: {
    anim1: 'mixamo.com',
    anim2: 'Walk',
  },
  data: {
    currentAnimIndex: ecs.i32,
  },
  stateMachine: ({world, eid, schemaAttribute, dataAttribute}) => {
    ecs.defineState('default')
      .initial()
      .onEnter(() => {
        dataAttribute.set(eid, { currentAnimIndex: 0 })

        world.events.addListener(eid, ecs.input.UI_CLICK, () => {
          const {character, anim1, anim2} = schemaAttribute.get(eid)
          const {currentAnimIndex} = dataAttribute.get(eid)

          if (!character || !ecs.GltfModel.has(world, character)) {
            console.warn('ToggleAnimation: La entidad asignada no tiene un componente GltfModel.')
            return
          }

          const nextIndex = currentAnimIndex === 0 ? 1 : 0
          const nextAnimName = nextIndex === 0 ? anim1 : anim2

          ecs.GltfModel.mutate(world, character, (cursor) => {
            cursor.animationClip = nextAnimName
          })

          dataAttribute.set(eid, { currentAnimIndex: nextIndex })
        })
      })
  },
})