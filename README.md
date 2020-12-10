# Algoritmo Genético
Este projeto foi desenvolvido como trabalho prático da disciplina de Inteligência Artificial 2020/1 da UFLA (Universidade Federal de Lavras) e pode ser encontrado em https://github.com/leoamsena/algoritmo-genetico.


Conteúdo do arquivo
---------------	

- O código fonte para o trabalho se encontra dentro da pasta src.
-- O arquivo main.js é o arquivo inicial da aplicação frontend desenvolvida em - Vue.js.
-- O arquivo back.js é o arquivo que possui a classe e a função que contém toda a lógica do algoritmo genético.
-- O arquivo App.vue têm as marcações e estilos para o frontend, além de possuir uma parte de lógica que interage com o arquivo back.js para executar e exibir resultados do algoritmo.
- A pasta distLocal contem arquivos para execução local, que será detalhada na seção  'Execução local em browser'.
- A pasta dist contem arquivos para execução em servidor HTTP e não deve ser utilizada.
- Demais arquivos dizem respeito ao gerenciador de dependências NPM e ao gerenciamento de versões Git.

Execução 
---------------	

Existem 3 formas de executar a aplicação, sendo elas: site do github pages, exceução local em browser e criação de servidor local. Todas as formas serão detalhadas abaixo e qualquer uma delas provêm do mesmo código fonte, portanto **é necessário realizar apenas uma delas**, de livre escolha.

### Site github pages

Para acessar a aplicação via site do github pages basta acessar o site https://leoamsena.github.io/algoritmo-genetico/ através de qualquer navegador (browser) atualizado e com a opção de execução de javascript ativada.

### Execução local em browser
Os arquivos para execução local estão dentro da pasta localDist e para executar a aplicação deste modo basta abrir o arquivo index.html em algum navegador (browser) atualizado e com a opção de execução de javascript ativada.

### Criação de servidor local
Para criação de um servidor local de desenvolvimento são necessários atender os seguintes pre-requisitos e seguir algumas instruções que serão detalhadas abaixo.

#### Requisitos
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

#### Instruções
Os comandos abaixo devem ser executados no terminal:
1. git clone https://github.com/leoamsena/algoritmo-genetico
2. cd algoritmo-genetico
3. npm i
4. npm run serve

