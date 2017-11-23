import { Tarefa } from '../definitions/Tarefa';

export class Pendencia {
    id: String;
    idGrupo: String;
    tarefa: Tarefa;
    votos = [];
}