<template>
  <div id="app">
    <b-container>
      <b-card>
        <b-row align-v="center">
          <b-col>
            <b-row>
              <b-col>
                <label for="taxaCross">Taxa de crossover: </label>
                {{ taxaCrossover * 100 }}%
                <b-input-group prepend="0" append="100">
                  <b-form-input
                    id="taxaCross"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    v-model="taxaCrossover"
                  ></b-form-input>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <label for="taxaMut">Taxa de mutação: </label>
                {{ taxaMutacao * 100 }}%
                <b-input-group prepend="0" append="100">
                  <b-form-input
                    id="taxaMut"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    v-model="taxaMutacao"
                  ></b-form-input>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <label for="geracoes">Máximo de gerações: </label>
                <b-input-group>
                  <b-form-input
                    id="geracoes"
                    type="number"
                    v-model="maxGeracoes"
                  ></b-form-input>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <label for="tamGer">Número de indivíduos por gerações: </label>
                <b-input-group>
                  <b-form-input
                    placeholder="Deve ser um número PAR"
                    id="tamGer"
                    type="number"
                    v-model="nIndividuos"
                  ></b-form-input>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <b-button @click="gerarEstadoInicial" variant="primary"
                  >Gerar {{ estadoGerado ? "novo " : "" }}estado
                  inicial</b-button
                >
              </b-col>
            </b-row>
          </b-col>
          <b-col sm v-if="estadoGerado">
            <b-row>
              <b-col sm class="text-center">
                <h2>Geração número: {{ indexGeracao + 1 }}</h2>
                <h2>{{ geracaoAtual }}</h2>
                <h2 v-if="indexGeracao + 1 === maxGeracoes">
                  Máximo encontrado: {{ melhorApt }}
                </h2>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <apexchart
                  type="line"
                  :options="options"
                  :series="series"
                ></apexchart>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row align-h="between" v-if="estadoGerado">
          <b-col cols="auto">
            <b-button
              variant="danger"
              @click="geracaoAnterior"
              v-if="indexGeracao - 1 >= 0"
              >Geração Anterior</b-button
            >
          </b-col>
          <b-col cols="auto">
            <b-button
              @click="pularParaFinal"
              v-if="indexGeracao + 1 < maxGeracoes"
              >Pular para o final</b-button
            >
          </b-col>
          <b-col cols="auto">
            <b-button
              v-if="indexGeracao + 1 < maxGeracoes"
              @click="proximaGeracao"
              variant="success"
              >Próxima geração</b-button
            >
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import algoritmoGenetico from "./back";
export default {
  name: "App",
  data: function () {
    return {
      melhorApt: 0,
      maxGeracoes: 5,
      nIndividuos: 4,
      ag: algoritmoGenetico,
      indexGeracao: 0,
      taxaCrossover: 0.7,
      taxaMutacao: 0.01,
      estadoGerado: false,
      options: {
        markers: {
          size: 5,
          discrete: [],
        },
        xaxis: {
          categories: [],
        },
      },
      series: [],

      geracoes: [],
    };
  },
  methods: {
    pularParaFinal() {
      this.indexGeracao = this.maxGeracoes - 1;
    },
    proximaGeracao() {
      if (this.indexGeracao + 1 < this.maxGeracoes) this.indexGeracao++;
    },
    geracaoAnterior() {
      if (this.indexGeracao - 1 >= 0) this.indexGeracao--;
    },
    marcarPontos(x) {
      this.options.markers.discrete = [];

      x.forEach((ponto) => {
        this.options.markers.discrete.push({
          seriesIndex: 0,
          dataPointIndex: this.valoresX.indexOf(ponto),
          fillColor: "red",
          strokeColor: "red",
          size: 5,
        });
      });
      console.log(this.options.markers.discrete, x);
    },
    funcao(x) {
      return x ** 2 - 3 * x + 4;
    },
    sinalizarMudanca() {
      this.options = { ...this.options, novo: "atualizou" };
      this.series = [...this.series];
      console.log(this.options);
    },
    gerarEstadoInicial() {
      if (this.maxGeracoes > 0 && this.nIndividuos > 0) {
        this.indexGeracao = 0;
        this.melhorApt = 0;
        this.options.xaxis.categories = this.valoresX;
        this.series = [{ name: "Y", data: this.valoresY }];
        const [geracoes, melhorApt] = this.ag(
          parseInt(this.nIndividuos),
          parseFloat(this.taxaMutacao),
          parseFloat(this.taxaCrossover),
          parseInt(this.maxGeracoes)
        );
        this.geracoes = geracoes;
        this.melhorApt = melhorApt;
        this.indexGeracao = 0;
        this.estadoGerado = true;
      }
    },
  },
  computed: {
    valoresX() {
      const arr = [];
      for (let i = -10; i <= 10; i++) arr.push(i);
      return arr;
    },
    valoresY() {
      const arr = [];
      for (let i = -10; i <= 10; i++) arr.push(this.funcao(i));
      return arr;
    },
    geracaoAtual() {
      return this.geracoes[this.indexGeracao];
    },
  },
  created() {
    document.title = "Algoritmo Genético";
  },
  watch: {
    geracaoAtual() {
      if (this.geracoes.length > 0) {
        this.marcarPontos(this.geracaoAtual);
        this.sinalizarMudanca();
      }
    },
  },
};
</script>

<style></style>
