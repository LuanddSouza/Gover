from flask import Flask, request, jsonify
from dotenv import load_dotenv
import psycopg2
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv(encoding='utf-8')  # força leitura correta

app = Flask(__name__)

# Pegar dados do ambiente
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT")

# Conectar ao Supabase
conn = psycopg2.connect(
    host=DB_HOST,
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    port=DB_PORT
)

@app.route("/api/salvar", methods=["POST"])
def salvar_transacao():
    try:
        dados = request.get_json()

        # ---------- VALIDAÇÕES BÁSICAS ----------
        campos_obrigatorios = ["categoria", "valor", "descricao", "data", "instituicao", "tipo"]
        for campo in campos_obrigatorios:
            if campo not in dados or not dados[campo]:
                return jsonify({"erro": f"Campo obrigatório ausente: {campo}"}), 400

        try:
            valor = float(dados["valor"])
        except ValueError:
            return jsonify({"erro": "Valor deve ser numérico"}), 400

        if valor < 0:
            return jsonify({"erro": "Valor não pode ser negativo"}), 400

        if len(dados["descricao"]) > 100:
            return jsonify({"erro": "Descrição muito longa (limite de 100 caracteres)"}), 400

        if len(dados["instituicao"]) > 100:
            return jsonify({"erro": "Nome da instituição muito longo (limite de 100 caracteres)"}), 400

        # Validação de data (esperando ISO 8601: YYYY-MM-DD)
        try:
            data = datetime.strptime(dados["data"], "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"erro": "Data inválida. Use o formato YYYY-MM-DD"}), 400

        # ---------- INSERÇÃO ----------
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO transacoes (conta_id, categoria, valor, descricao, data, instituicao, tipo)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            '00000000-0000-0000-0000-000000000001',  # conta padrão temporária
            dados["categoria"],
            valor,
            dados["descricao"],
            data,
            dados["instituicao"],
            dados["tipo"]
        ))
        conn.commit()
        cur.close()
        return jsonify({"mensagem": "Transação salva com sucesso!"}), 201

    except Exception as e:
        print("Erro no backend:", e)
        return jsonify({"erro": "Erro interno ao salvar transação"}), 500
