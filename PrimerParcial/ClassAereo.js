import { Vehiculo } from "./ClassVehiculo.js";

export class Aereo extends Vehiculo
{
    #altMax = -1; //Float > 0
    #autonomia = -1; //int

    constructor(id, modelo, velMax, anoFab, altMax, autonomia)
    {
        super(id,modelo,velMax,anoFab);
        this.#altMax = altMax;
        this.#autonomia = autonomia;
    }

    get altMax()
    {
        return this.#altMax;
    }
    set altMax(altMax)
    {
        this.#altMax = altMax;
    }

    get autonomia()
    {
        return this.#autonomia;
    }
    set autonomia(autonomia)
    {
        this.#autonomia = autonomia;
    }

    getAll(filtro, completo = false)
    {
        let v = super.getAll(filtro);

        if (completo)
        {
            if (filtro.includes("Puertas") && this.cantPue != undefined)
            {
                v.cantPue = this.cantPue;
            }

            if (filtro.includes("Ruedas") && this.cantRue != undefined)
            {
                v.cantRue = this.cantRue;
            }
        }
        if (filtro.includes("Altura"))
        {
            v.altMax = this.#altMax;
        }

        if (filtro.includes("Autonomia"))
        {
            v.autonomia = this.#autonomia;
        }
        
        return v;
    }

    toString()
    {
        var txt = super.toString() + "\Altura: " + this.#altMax + "\nAutonomia: " + this.#autonomia;
        return txt;
    }

    generarListaDeAtributos()
    {
        let atributosPadre = super.generarListaDeAtributos();
        let atributosHijo = atributosPadre.concat(["Altura", "Autonomia"]);
        return atributosHijo;
    }
}