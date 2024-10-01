export class Vehiculo
{
    #id =-1; //Int
    #modelo =""; //Str
    #anoFab =-1; //Int >1885
    #velMax =""; //Int

    constructor(id, modelo, velMax, anoFab)
    {
        this.#id = id;
        this.#modelo = modelo;
        this.#velMax = velMax;
        this.#anoFab = anoFab;
    }

    get id()
    {
        return this.#id;
    }
    set id(id)
    {
        this.#id = id;
    }

    get modelo()
    {
        return this.#modelo;
    }
    set modelo(modelo)
    {
        this.#modelo = modelo;
    }

    get velMax()
    {
        return this.#velMax;
    }
    set velMax(velMax)
    {
        this.#velMax = velMax;
    }

    get anoFab()
    {
        return this.#anoFab;
    }
    set anoFab(anoFab)
    {
        this.#anoFab = anoFab;
    }

    getAll(filtro)
    {
        let v = {};
        if (filtro.includes("ID"))
        {
            v.ID = this.#id;
        }

        if (filtro.includes("VelMax"))
        {
            v.VelMax = this.#velMax;
        }

        if (filtro.includes("Modelo"))
        {
            v.Modelo = this.#modelo;
        }

        if (filtro.includes("Fabricacion"))
        {
            v.Fabricacion = this.#anoFab;
        }
        return v;
    }

    toString()
    {
        var txt = "ID: " + this.#id + "\nModelo: " + this.#modelo + "\nVelMax: " + this.#velMax + "\nFabricacion: " + this.#anoFab;
        
        return txt;
    }

    toJson()
    {
        return JSON.stringify(this);
    }

    generarListaDeAtributos()
    {
        let atributos = ["ID","VelMax", "Modelo", "Fabricacion"]
        return atributos;
    }

    static generarListaCompletaDeAtributos()
    {
        let atributos = ["ID","VelMax", "Modelo", "Fabricacion", "Altura", "Autonomia", "Puertas", "Ruedas"];
        return atributos;
    }
}