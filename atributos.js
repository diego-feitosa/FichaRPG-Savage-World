import {slugify} from "./tools.js";

const atributos_lista = [
    {"nome": "Agilidade", "gasto": 0, "min": 0, "max": 5},
    {"nome": "Astúcia", "gasto": 0, "min": 0, "max": 5},
    {"nome": "Espírito", "gasto": 0, "min": 0, "max": 5},
    {"nome": "Força", "gasto": 0, "min": 0, "max": 5},
    {"nome": "Vigor", "gasto": 0, "min": 0, "max": 5}
]

const pontos_totais = 5;

export const montar_atributos_html = elemento =>
{
    for (const atributo of atributos_lista) 
    {
        const slug = "atributo-" + slugify(atributo.nome);

        const label = document.createElement("label");
        label.innerHTML = atributo.nome;
        label.id = slug + "-label";
        
        const dados = document.createElement("div");
        dados.id = slug + "-dados";
        dados.classList.add("dados");
        for (let index = 0; index < atributo.max; index++) 
        {
            const quantidade_faces = 4 + index * 2;
            const dado = document.createElement("span");
            dado.classList.add("dado");
            dado.innerHTML = "D" + quantidade_faces;
            dado.dataset.faces = quantidade_faces;
            dados.appendChild(dado);
        }        
        
        const bonus = document.createElement("div");
        bonus.classList.add("bonus");
        bonus.innerHTML = "+0";

        const jogadas = document.createElement("div"); 
        jogadas.classList.add("jogadas");
        jogadas.appendChild(dados);
        jogadas.appendChild(bonus);

        const div = document.createElement("div");
        div.id = slug;
        div.classList.add("atributo");
        div.appendChild(label);
        div.appendChild(jogadas);
        elemento.appendChild(div);
    }
    identificar_dados_marcados(elemento);
    engatilhar_selecoes_dados(elemento);
}

const identificar_dados_marcados = elemento => 
{
    for (const atributo of atributos_lista) 
    {
        const slug = "atributo-" + slugify(atributo.nome);
        const atributo_el = elemento.querySelector("#"+slug);
        const jogadas = atributo_el.querySelector(".jogadas");
        const dados = jogadas.querySelectorAll(".dado");
        const bonus = jogadas.querySelectorAll(".bonus");
        const faces = 4 + atributo.gasto * 2;
        for (const dado of dados) 
        {
            const dado_face = dado.dataset.faces;
            dado.classList.remove("comprado");
            if(faces == dado.dataset.faces)
            {
                dado.classList.add("comprado");
            }
        }
    }
}

const engatilhar_selecoes_dados = elemento =>
{
    for (const atributo of atributos_lista) 
    {
        const slug = "atributo-" + slugify(atributo.nome);
        const atributo_el = elemento.querySelector("#"+slug);
        const jogadas = atributo_el.querySelector(".jogadas");
        const dados = jogadas.querySelectorAll(".dado");

        for (const dado of dados) 
        {
            dado.addEventListener("click", event => {
                executar_selecoes_dados(atributo, dado);
                identificar_dados_marcados(elemento);
            })
        }
    }
}

const executar_selecoes_dados = (atributo, dado) =>
{
    const custo = (dado.dataset.faces - 4) / 2;
    let gastos = 0;
    for (const atr of atributos_lista) {
        if(atributo !== atr) gastos += atr.gasto;
    }

    if(gastos+custo > pontos_totais)
    {
        const para_gastar = pontos_totais - gastos;
        let msg = "";
        msg += "Não possui pontos o suficiente para subir o atributo " + atributo.nome + ". ";
        if(para_gastar > 0)
        {
            msg += "É possível subir somente até o D" + (4 + para_gastar * 2);
        }
        else
        {
            msg += "Diminua de outro atributo para poder aumentar esse."
        }
        alert(msg);
        return false;
    }

    atributo.gasto = custo;

}
