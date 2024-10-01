import { Vehiculo } from "./ClassVehiculo.js";
import { Terrestre } from "./ClassTerrestre.js";
import { Aereo } from "./classAereo.js";

const colorRojo = "rgb(246, 76, 76)";
var cadenaDeCaracteres = '[{"id":14,"modelo":"FerrariF100","anoFab":1998,"velMax":400,"cantPue":2,"cantRue":4},{"id":51,"modelo":"DodgeViper","anoFab":1991,"velMax":266,"cantPue":2,"cantRue":4},{"id":67,"modelo":"BoeingCH-47Chinook","anoFab":1962,"velMax":302,"altMax":6,"autonomia":1200},{"id":666,"modelo":"ApriliaRSV1000R","anoFab":2004,"velMax":280,"cantPue":0,"cantRue":2},{"id":872,"modelo":"Boeing747-400","anoFab":1989,"velMax":988,"altMax":13,"autonomia":13450},{"id":742,"modelo":"CessnaCH-1SkyhookR","anoFab":1953,"velMax":174,"altMax":3,"autonomia":870}]';
var arrayVehiculos = deserializarJson(cadenaDeCaracteres);
var ultimaId = getUltimaId();
var datos = document.getElementById("datos");
var abm = document.getElementById("abm");
var formTerrestre = document.getElementById("formTerrestre");
var formAereo = document.getElementById("formAereo");
var dropFiltro = document.getElementById("filtro");
var dropTipo = document.getElementById("select_tipo");
var btnAgregar = document.getElementById("btn_agregar");
var btnAceptar = document.getElementById("btn_aceptar");
var btnCancelar = document.getElementById("btn_cancelar");
var columnas = document.getElementById("columnas");
var btnCalcular = document.getElementById("calcularPromedio");
var txtPromedio = document.getElementById("promedio");
var txtVelMax = document.getElementById("txt_velMax");
var txtModelo= document.getElementById("txt_modelo");
var txtFabricacion = document.getElementById("txt_anoFab");
var txtCantCantPue = document.getElementById("txt_puertas");
var txtCantRue = document.getElementById("txt_ruedas");
var txtAltura = document.getElementById("txt_altura");
var txtAutonomia = document.getElementById("txt_autonomia");
var lblAdvertenciaInvalido = document.getElementById("advertenciaInvalido");
var txtId = document.getElementById("txt_id");
var btnBorrar = document.getElementById("btn_borrar");

//funciones
function getUltimaId()
{
    let arrayIds = [];

    arrayVehiculos.forEach(element =>{
        arrayIds.push(element.id);
    });

    let arrayOrdenado = arrayVehiculos.sort((a,b)=>{
        if (a.id > b.id)
        {
            return -1;
        }
        else if (a.id < b.id)
        {
            return 1;
        }
        else
        {
            return 0
        }
    })

    return arrayOrdenado[0].id;

}

function deserializarJson(json)
{
    var arrayDeObjetos = JSON.parse(json);
    var arrayTerrestre = [];
    var arrayAereo = [];

    var i = 0;
    while (i < arrayDeObjetos.length)
    {
        if(arrayDeObjetos[i].autonomia == undefined)
        {
            arrayTerrestre.push(Object.assign(new Terrestre(), arrayDeObjetos[i]));
        }

        if(arrayDeObjetos[i].cantPue == undefined)
        {
            arrayAereo.push(Object.assign(new Aereo(), arrayDeObjetos[i]));
        }

        i++;
    }

    let arrayFinal = arrayTerrestre.concat(arrayAereo);
    return arrayFinal;
}

function filtrarLista(lista)
{
    var v = lista.filter((elemento)=>{
        if (dropFiltro.value=="terrestre" && elemento instanceof Terrestre || dropFiltro.value == "todos")
        {
            return true;
        }

        if (dropFiltro.value=="aereo" && elemento instanceof Aereo)
        {
            return true;
        }

        return false;
    });

    return v;
}

function dibujarTabla(lista)
{
    //conseguir array con checkboxes checked
    var arrayChecked = Array.from(document.querySelectorAll("input[name='chk_columnas']:checked")).map((elem) => elem.value);
    //filtrar tabla
    var v = filtrarLista(lista);
    //conseguir array con ids
    var arrayIds = [];
    v.forEach(element =>{
        arrayIds.push(element.id);
    });
    //remover tabla
    document.getElementById("tablaVehiculos").remove();
    //crear nueva tabla
    let nuevaTabla = document.createElement("table");
    //crear headers
    var dataHeaders = [];
    if (dropFiltro.value == "todos")
    {
        dataHeaders = Vehiculo.generarListaCompletaDeAtributos();
    }
    else
    {
        dataHeaders = v[0].generarListaDeAtributos();
    }
    //filtrar según checkboxes
    var dataHeaders = arrayChecked.filter((element) => dataHeaders.includes(element));
    
    //crear rows
    var dataRows = [];
    if (dropFiltro.value == "todos")
    {
        v.forEach(element => {
            if(element.autonomia == undefined)
            {
                element.autonomia = "-";
            }
    
            if(element.cantPue == undefined)
            {
                element.cantPue = "-";
            }

            if(element.altMax == undefined)
            {
                element.altMax = "-";
            }
            
            if(element.cantRue == undefined)
            {
                element.cantRue = "-";
            }
        });

        v.forEach(element => {
            dataRows.push(element.getAll(arrayChecked,true));
        });
    }
    else
    {
        v.forEach(element => {
            dataRows.push(element.getAll(arrayChecked));
        });
    }    
    
    nuevaTabla.setAttribute("id", "tablaVehiculos");
    generateTableHead(nuevaTabla, dataHeaders);
    generateTable(nuevaTabla, dataRows);
    //agregar nueva tabla
    document.getElementById("divTabla").appendChild(nuevaTabla);
    addRowHandlers(arrayIds);
}

function generateTableHead(table, data) 
{
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.addEventListener("click", ()=>ordenarTabla(th.textContent));
      th.appendChild(text);
      row.appendChild(th);
    }
}

function generateTable(table, data)
{
    for (let element of data)
    {
        let row = table.insertRow();
        for (let key in element)
        {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

function ordenarTabla(text)
{
    console.log(text);
    switch (text) {
        case "ID":
            arrayVehiculos.sort((x,y)=> {
                if (x.id > y.id)
                { 
                    return 1;
                } 
                else if (x.id < y.id) 
                { 
                    return -1;
                } else 
                { 
                    return 0;
                }
            });

            break;
    
        case "VelMax":
            arrayVehiculos.sort((x,y)=> {
                if (x.velMax > y.velMax)
                { 
                    return 1;
                } 
                else if (x.velMax < y.velMax) 
                { 
                    return -1;
                } else 
                { 
                    return 0;
                }
            });

            break;
        case "Modelo":
            arrayVehiculos.sort((x,y)=> {
                if (x.modelo > y.modelo)
                { 
                    return 1;
                } 
                else if (x.modelo < y.modelo) 
                { 
                    return -1;
                } else 
                { 
                    return 0;
                }
                });
                break;

        case "Fabricacion":
            arrayVehiculos.sort((x,y)=> {
                if (x.anoFab > y.anoFab)
                { 
                    return 1;
                } 
                else if (x.anoFab < y.anoFab) 
                { 
                    return -1;
                } else 
                { 
                    return 0;
                }
            });

            break;
        case "Ruedas":
            arrayVehiculos.sort((x,y)=> {
                if (x.cantRue > y.cantRue)
                { 
                    return 1;
                } 
                else if (x.cantRue < y.cantRue) 
                { 
                    return -1;
                } else 
                { 
                    return 0;
                }
            });

            break;
        case "Puertas":
            arrayVehiculos.sort((x,y)=> {
                if (x.cantPue > y.cantPue || x.cantPue == "-")
                { 
                    return 1;
                } 
                else if (x.cantPue < y.cantPue) 
                { 
                    return -1;
                } else 
                { 
                    return 0;
                }
            });

            break;
        case "Altura":
            arrayVehiculos.sort((x,y)=> {
                if (x.altMax > y.altMax || x.altMax == "-")
                { 
                    return 1;
                } 
                else if (x.altMax < y.altMax) 
                { 
                    return -1;
                } else 
                { 
                    return 0;
                }
            });

            break;
        case "Autonomia":
            arrayVehiculos.sort((x,y)=> {
                if (x.autonomia > y.autonomia || x.autonomia == "-")
                { 
                    return 1;
                } 
                else if (x.autonomia < y.autonomia) 
                { 
                    return -1;
                } else 
                { 
                    return 0;
                }
            });

            break;

        default:
            console.log("Header inválido: " + text);
            break;
    }

    actualizarTabla();
}

function addRowHandlers(arrayIds) {
    let rows = tablaVehiculos.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        let currentRow = tablaVehiculos.rows[i];
        currentRow.addEventListener("dblclick", ()=>{cambiarForm(true)});
        currentRow.addEventListener("dblclick", ()=>{popularForm(arrayIds[i-1])});
    }
}

function cambiarForm(modificar = false)
{
    if (modificar == true)
    {
        btnAceptar.value = "Modificar";
    }
    else
    {
        btnAceptar.value = "Agregar";
    }

    if (datos.style.display == "none")
    {
        actualizarTabla();
        datos.style.display = "block";
    }
    else
    {
        datos.style.display = "none";
    }

    if (abm.style.display == "none")
    {
        abm.style.display = "block";
        actualizarForm();
        txtId.value = ultimaId + 1;
    }
    else
    {
        abm.style.display = "none";
        dropTipo.disabled = false;
    }
}

function popularForm(idVehiculo)
{
    let p = arrayVehiculos.filter((elemento) => {return elemento.id == idVehiculo});
    
    btnBorrar.style.display = "inline";

    txtId.value = p[0].id;
    txtVelMax.value = p[0].velMax;
    txtModelo.value = p[0].modelo;
    txtFabricacion.value = p[0].anoFab;

    if (p[0] instanceof Terrestre)
    {
        dropTipo.value = "terrestre";
        dropTipo.disabled = true;
        actualizarForm()
        txtCantCantPue.value = p[0].cantPue;
        txtCantRue.value = p[0].cantRue;
    }
    else if (p[0] instanceof Aereo)
    {
        dropTipo.value = "aereo";
        dropTipo.disabled = true;
        actualizarForm()
        txtAltura.value = p[0].altMax;
        txtAutonomia.value = p[0].autonomia;
    }
}

function calcularPromedio(lista)
{
    let arrayFiltrada = filtrarLista(lista);
    let arrayMapeada = arrayFiltrada.map((elemento)=>{
        return elemento.velMax;
    });
    let sumatoriaFabricaciones = arrayMapeada.reduce((valorAnterior, elemento)=>{
        return valorAnterior + elemento;
    });
    return sumatoriaFabricaciones / arrayMapeada.length;
}

function darAlta()
{
    if (dropTipo.value == "terrestre")
    {
        if (validarDatosIngresados())
        {
            let e = new Terrestre(parseInt(txtId.value), txtModelo.value, parseFloat(txtVelMax.value), parseInt(txtFabricacion.value), parseInt(txtCantCantPue.value), parseInt(txtCantRue.value));
            arrayVehiculos.push(e);
            cambiarForm();
            limpiarForm();
        }
        else
        {
            lblAdvertenciaInvalido.style.display = "block";
        }

    }
    else if (dropTipo.value == "aereo")
    {
        if (validarDatosIngresados())
        {
            let c = new Aereo(parseInt(txtId.value), txtModelo.value, txtVelMax.value, parseInt(txtFabricacion.value), parseFloat(txtAltura.value), parseInt(txtAutonomia.value));
            arrayVehiculos.push(c);
            cambiarForm();
            limpiarForm();
        }
        else
        {
            lblAdvertenciaInvalido.style.display = "block";
        }
    }
}

function validarDatosIngresados()
{
    let x = true;

    if (txtModelo.value == "")
    {
        txtModelo.style.backgroundColor = colorRojo;
        x = false;
    }
    else
    {
        txtModelo.style.backgroundColor = "white";
    }

    if (!isNaN(parseFloat(txtVelMax.value)) && isFinite(txtVelMax.value) && parseFloat(txtVelMax.value) > 0)
    {
        txtVelMax.style.backgroundColor = "white";
    }
    else
    {
        txtVelMax.style.backgroundColor = colorRojo;
        x = false;
    }

    if (!isNaN(parseInt(txtFabricacion.value)) && isFinite(txtFabricacion.value) && !/\./.test(txtFabricacion.value) && parseInt(txtFabricacion.value) > 1885)
    {
        txtFabricacion.style.backgroundColor = "white";
    }
    else
    {
        txtFabricacion.style.backgroundColor = colorRojo;
        if (parseInt(txtFabricacion.value) <= 1885 && !/\./.test(txtFabricacion.value))
        {
            lblAdvertenciaInvalido.textContent += ". Año de Fabricacion debe ser mayor a 1885";
        }
        x = false;
    }

    if (dropTipo.value == "aereo" || !isNaN(parseInt(txtCantCantPue.value)) && isFinite(txtCantCantPue.value) && !/\./.test(txtCantCantPue.value) && parseInt(txtCantCantPue.value) > -1)
    {
        txtCantCantPue.style.backgroundColor = "white";
    }
    else
    {
        txtCantCantPue.style.backgroundColor = colorRojo;
        x = false;
    }

    if (dropTipo.value == "aereo"  || !isNaN(parseFloat(txtCantRue.value)) && isFinite(txtCantRue.value) && parseFloat(txtCantRue.value) > 0)
    {
        txtCantRue.style.backgroundColor = "white";
    }
    else
    {
        txtCantRue.style.backgroundColor = colorRojo;
        x = false;
    }

    if (formAereo.style.display == "none" || !isNaN(parseFloat(txtAltura.value)) && isFinite(txtAltura.value) && parseFloat(txtAltura.value) > 0)
    {
        txtAltura.style.backgroundColor = "white";
    }
    else
    {
        txtAltura.style.backgroundColor = colorRojo;
        x = false;
    }

    if (formAereo.style.display == "none" || !isNaN(parseInt(txtAutonomia.value)) && isFinite(txtAutonomia.value) && !/\./.test(txtAutonomia.value) && parseInt(txtAutonomia.value) > -0)
    {
        txtAutonomia.style.backgroundColor = "white";
    }
    else
    {
        txtAutonomia.style.backgroundColor = colorRojo;
        x = false;
    }

    return x;
}

function modificar()
{
    if (validarDatosIngresados())
    {
        arrayVehiculos.forEach((item) => {
            if (item.id == txtId.value)
            {
                item.modelo = txtModelo.value;
                item.velMax = parseInt(txtVelMax.value);
                item.anoFab = parseInt(txtFabricacion.value);

                if (dropTipo.value == "aereo")
                {
                    item.altMax = parseFloat(txtAltura.value);
                    item.autonomia = parseInt(txtAutonomia.value);
                }
                else if(dropTipo.value == "terrestre")
                {
                    item.cantRue = parseInt(txtCantRue.value);
                    item.cantPue = parseInt(txtCantCantPue.value);
                }
            }
        });

        cambiarForm();
        limpiarForm();
    }
    else
    {
        lblAdvertenciaInvalido.style.display = "block";
    }
}


//eventos

function borrar()
{
    let indexVehiculo = -1;

    for (let i = 0; i < arrayVehiculos.length; i++) {
        if (arrayVehiculos[i].id == txtId.value)
        {
            indexVehiculo = i;
            break;
        }
    }

    arrayVehiculos.splice(indexVehiculo, 1);
}

function aceptar()
{
    let p = arrayVehiculos.filter((elemento) => {return elemento.id == txtId.value});

    if(p.length == 0)
    {
        darAlta();
        ultimaId += 1;
    }
    else
    {
        modificar();
    }

}

function actualizarTabla()
{
    dibujarTabla(arrayVehiculos);
    txtPromedio.value = "";
}

function mostrarPromedio()
{
    txtPromedio.value = calcularPromedio(arrayVehiculos);
}

function actualizarForm()
{
    if (dropTipo.value == "terrestre")
    {
        formAereo.style.display = "none";
        formTerrestre.style.display = "block";
    }
    else if (dropTipo.value == "aereo")
    {
        formTerrestre.style.display = "none";
        formAereo.style.display = "block";
    }

    limpiarForm(false);
}

function limpiarForm(completo = true)
{
    lblAdvertenciaInvalido.style.display = "none";
    
    if (completo)
    {
        btnBorrar.style.display = "none";
        txtVelMax.value="";
        txtVelMax.style.backgroundColor = "white";
        txtModelo.value="";
        txtModelo.style.backgroundColor = "white";
        txtFabricacion.value="";
        txtFabricacion.style.backgroundColor = "white";
    }

    txtAltura.value="";
    txtAltura.style.backgroundColor = "white";
    txtCantRue.value="";
    txtCantRue.style.backgroundColor = "white";
    txtAutonomia.value="";
    txtAutonomia.style.backgroundColor = "white";
    txtCantCantPue.value="";
    txtCantCantPue.style.backgroundColor = "white";
}

addEventListener("load", () => {dibujarTabla(arrayVehiculos)});
dropFiltro.addEventListener("change", actualizarTabla);
columnas.addEventListener("change", actualizarTabla);
dropTipo.addEventListener("change", actualizarForm);
btnCalcular.addEventListener("click", mostrarPromedio);
btnAgregar.addEventListener("click", cambiarForm);
btnAgregar.addEventListener("click", limpiarForm);
btnAceptar.addEventListener("click", aceptar);
btnCancelar.addEventListener("click", cambiarForm);
btnCancelar.addEventListener("click", limpiarForm);
btnBorrar.addEventListener("click", borrar);
btnBorrar.addEventListener("click", cambiarForm);
btnBorrar.addEventListener("click", limpiarForm);


//////////////////////////////////////////TEST ZONE////////////////////////////////////////////////////////////////////

//evento temporario:
//addEventListener("load", () => {datos.style.display="none";});

//var testV = Array.from(document.querySelectorAll("input[name='chk_columnas']:checked")).map((elem) => elem.value);

//var rows = tablaVehiculos.getElementsByTagName('tr');



