// calcular o total de receitas e despesas
function calcularTotais() {
    const tabela = document.getElementById("tabela_movimentacoes");
    let totalReceitas = 0;
    let totalDespesas = 0;
    for (let i = 1; i < tabela.rows.length; i++) {
        const categoria = tabela.rows[i].cells[0].innerText;
        const valor = parseFloat(tabela.rows[i].cells[1].innerText.replace("R$ ", "").replace(",", "."));

        if (categoria.toLowerCase() === "receitas") {
            totalReceitas += valor;
        } else if (categoria.toLowerCase() === "despesas") {
            totalDespesas += valor;
        }
    }
    // Atualizar os totais na página
    document.getElementById("total_receitas").innerText = `R$ ${totalReceitas.toFixed(2)}`;
    document.getElementById("total_despesas").innerText = `R$ ${totalDespesas.toFixed(2)}`;

    document.getElementById("total_geral").innerText = `R$ ${(totalReceitas - totalDespesas).toFixed(2)}`;

}

document.getElementById("add_button").addEventListener("click", function () {
    // desfocar o fundo
    document.getElementById("main").classList.add("blur");
    document.getElementById("form-container").style.display = "flex";
});

//cancelar o formulário
document.getElementById("Cancelar_add").addEventListener("click", function () {
    // Limpa e oculta o formulário
    document.getElementById("form-container").style.display = "none";
    document.getElementById("input_valor").value = "";
    document.getElementById("input_descricao").value = "";
    document.getElementById("input_data").value = "";
    document.getElementById("input_instituicao").value = "";

    document.getElementById("main").classList.remove("blur");
});

//formulário de adicionar movimentação
document.getElementById("confirmar_add").addEventListener("click", function () {

    const categoria = document.getElementById("input_categoria").value;
    let valor = document.getElementById("input_valor").value;
    const descricao = document.getElementById("input_descricao").value;
    let data = document.getElementById("input_data").value;
    data = new Date(data).toLocaleDateString('pt-BR')
    const instituicao = document.getElementById("input_instituicao").value;

    // Validação dos campos
    if (!categoria || !valor || !descricao || !data || !instituicao) {
        alert("Por favor, preencha todos os campos.");
        return
    }

    const tabela = document.getElementById("tabela_movimentacoes");
    const novaLinha = tabela.insertRow(1);

    novaLinha.classList.add("table_row");

    novaLinha.innerHTML = `
        <td>${categoria}</td>
        <td>R$ ${parseFloat(valor).toFixed(2)}</td>
        <td>${descricao}</td>
        <td>${data}</td>
        <td>${instituicao}</td>
        <td><i class="fa-solid fa-trash remover-linha" style="cursor:pointer;"></i></td>
    `;

    //remover movimentação
    novaLinha.querySelector(".remover-linha").addEventListener("click", function () {
        const confirmacao = document.querySelector(".remover-linha");
        if (!confirmacao) return;
        const novaLinha = this.closest("tr");
        if (confirm("Tem certeza que deseja remover esta movimentação?")) {
            tabela.deleteRow(novaLinha.rowIndex);
            calcularTotais();
        }
    });
    // Limpa e oculta o formulário
    document.getElementById("form-container").style.display = "none";
    document.getElementById("input_valor").value = "";
    document.getElementById("input_descricao").value = "";
    document.getElementById("input_data").value = "";
    document.getElementById("input_instituicao").value = "";

    document.getElementById("main").classList.remove("blur");
    calcularTotais();

    // Enviar os dados para o backend
    fetch("/api/salvar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            categoria,
            valor: parseFloat(valor),
            descricao,
            data: document.getElementById("input_data").value, // data ISO, não formatada
            instituicao,
            tipo: categoria.toLowerCase() === "receitas" ? "entrada" : "saida"
        })
    })
        .then(res => res.json())
        .then(json => {
            console.log("✅ Transação salva:", json);
        })
        .catch(err => {
            console.error("❌ Erro ao salvar:", err);
        });
});
