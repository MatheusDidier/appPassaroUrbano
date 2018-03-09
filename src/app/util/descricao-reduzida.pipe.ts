import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
    {
        name: "descricaoReduzida"
    }
)
export class DescricaoReduzida implements PipeTransform {
    transform(texto: string, truncarEm: number, comecarEm:number = 0): string {
        if (texto.length > truncarEm) {
            return texto.substr(comecarEm, truncarEm) + "... ";
        }
        return texto;
    }
}