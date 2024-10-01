import { Vehiculo } from "./ClassVehiculo.js";

export class Terrestre extends Vehiculo
{
    #cantPue =-1; //Int > -1
    #cantRue =-1; //Int

    constructor(id, modelo, velMax, anoFab, cantPue, cantRue)
    {
        super(id,modelo,velMax,anoFab);
        this.#cantPue = cantPue;
        this.#cantRue = cantRue;
    }

    get cantPue()
    {
        return this.#cantPue;
    }
    set cantPue(cantPue)
    {
        this.#cantPue = cantPue;
    }
    
    get cantRue()
    {
        return this.#cantRue;
    }
    set cantRue(cantRue)
    {
        this.#cantRue = cantRue;
    }

    getAll(filtro, completo = false)
    {
        let v = super.getAll(filtro);

        if (filtro.includes("Puertas"))
        {
            v.puertas = this.#cantPue;
        }
        if (filtro.includes("Ruedas"))
        {
            v.ruedas = this.#cantRue;
        }
        
        if (completo)
        {
            if (filtro.includes("Altura") && this.altMax != undefined)
            {
                v.altMax = this.altMax;
            }

            if (filtro.includes("Autonomia") && this.autonomia != undefined)
            {
                v.autonomia = this.autonomia;
            }
        }

        return v;
    }

    toString()
    {
        var txt = super.toString() + "\nPuertas: " + this.#cantPue + "\nRuedas" + this.#cantRue;
        return txt;
    }

    generarListaDeAtributos()
    {
        let atributosPadre = super.generarListaDeAtributos();
        let atributosHijo = atributosPadre.concat(["Puertas", "Ruedas"]);
        return atributosHijo;
    }
}