import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import EventBus from 'diagram-js/lib/core/EventBus';
import BpmnFactory from 'bpmn-js/lib/features/modeling/BpmnFactory';

import { is } from 'bpmn-js/lib/util/ModelUtil';

/**
 * Workaround to force the creation of bpmn:DataStore
 * 
 * When a bpmn:DataStoreReference is created, a bpmn:DataStore is created as well.
 * Furthermore, it is injected to the BPMN and wired to the right place.
 */
export default class CreateDataStoreBehavior extends CommandInterceptor {
static $inject = [
    'eventBus',
    'bpmnFactory'
  ];

  eventBus: EventBus;
  bpmnFactory: BpmnFactory;

  constructor(eventBus: EventBus, bpmnFactory: BpmnFactory) {
    super(eventBus);
    this.eventBus = eventBus;
    this.bpmnFactory = bpmnFactory;

    this.preExecute('shape.create', function(event) {

        const context = event.context;
        const shape = context.shape;

        if (is(shape, 'bpmn:DataStoreReference') && shape.type !== 'label') {

          // create a DataStore every time a DataStoreReference is created
          const dataStore = bpmnFactory.create('bpmn:DataStore');
          // get the root element, so that the DataStore can be placed there
          const root = getRoot(context.parent.businessObject);
          dataStore.$parent = root;
          root.rootElements.push(dataStore);
          // set the DataStoreReference reference to the DataStore
          shape.businessObject.dataStoreRef = dataStore;
        }
    });

    function getRoot(element: any) {
      console.log(element);
      if (element.$parent == undefined && element.rootElements) return element;
      else return getRoot(element.$parent);
    }
  }
}