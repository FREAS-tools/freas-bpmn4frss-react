import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import EventBus from 'diagram-js/lib/core/EventBus';
import BpmnFactory from 'bpmn-js/lib/features/modeling/BpmnFactory';

import { is } from 'bpmn-js/lib/util/ModelUtil';

/**
 * Workaround to force the creation of bpmn:DataStore
 * 
 * When a bpmn:DataStoreReference is created, a bpmn:DataStore is created as well.
 * Furthermore, it is injected to the BPMN and wired to the right place.
 * The wiring is required as bpmn:DataStore is not a FlowElement, whereas bpmn:DataObject is.
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
        // set the DataStore parent
        dataStore.$parent = context.parent;
        // add the DataStore to parent's flow elements
        context.parent.businessObject.flowElements.push(dataStore);

        // modeling.updateProperties(element, {
        //   dataStoreRef: dataStore,
        // });

        // set the DataStoreReference reference to the DataStore
        shape.businessObject.dataStoreRef = dataStore;
        }
    });
  }
}