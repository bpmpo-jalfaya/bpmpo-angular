export class ProcessInstance {
    appVersion: number;
    id: string;
    name: string;
    processDefinitionId: string;
    processDefinitionKey: string;
    initiator: string;
    startDate: Date;
    businessKey: string;
    status: string;
    parentId: number;
    processDefinitionVersion: number;
}