function Admin() {
  return (
    <div class="container">
      <h1>Administrador</h1>
      <div class="card">
        <h2>Gerenciar administradores do sistema</h2>

        {/*  O usuario deve poder selecionar um administrador e esolher edita-lo ou exclui-lo  */}
        <div class="wrapperTable">
          <table id="administradores">
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
            </tr>
            <tr>
              <td>1</td>
              <td>admin</td>
              <td>12-93456-7890</td>
              <td>admin@admin.com</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Fabio Destro</td>
              <td>12-93456-7890</td>
              <td>fbfdestro@usp.br</td>
            </tr>
          </table>
        </div>

        <div class="text-right">
          <button class="btn-principal">Adicionar</button>
        </div>

        <form class="folded-box">
          <h3 class="folded-titulo">
            Novo administrador (só estará visivel ao clicar em "Adicionar")
          </h3>
          <label for="nomeAdmin">Nome</label>
          <input
            type="text"
            id="nomeAdmin"
            name="nomeAdmin"
            placeholder="Nome"
          />

          <label for="telefoneAdmin">Telefone</label>
          <input
            type="text"
            id="telefoneAdmin"
            name="telefoneAdmin"
            placeholder="Telefone"
          />

          <label for="emailAdmin">E-mail</label>
          <input
            type="email"
            id="emailAdmin"
            name="emailAdmin"
            placeholder="E-mail"
          />

          <label for="senhaAdmin">Senha</label>
          <input
            type="password"
            id="senhaAdmin"
            name="senhaAdmin"
            placeholder="Senha"
          />

          <label for="confirmarSenhaAdmin">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenhaAdmin"
            name="confirmarSenhaAdmin"
            placeholder="Confirmar Senha"
          />

          <div class="text-right">
            <button class="btn-cancel margin-right">Cancelar</button>
            <input type="submit" value="Cadastrar" class="btn-principal" />
          </div>
        </form>
      </div>

      <div class="card">
        <h2>Gerenciar livros</h2>

        {/*  O usuario deve poder selecionar um administrador e esolher edita-lo ou exclui-lo  */}
        <div class="wrapperTable">
          <table id="livros">
            <tr>
              <th>Id</th>
              <th>Titulo</th>
              <th>Preço</th>
              <th>Qunatidade em estoque</th>
              <th>Qunatidade vendida</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Harry Potter</td>
              <td>R$ 29.99</td>
              <td>25</td>
              <td>10</td>
            </tr>

            <tr>
              <td>1</td>
              <td>Harry Potter 2</td>
              <td>R$ 59.99</td>
              <td>5</td>
              <td>100</td>
            </tr>
          </table>
        </div>
        <div class="text-right">
          <button class="btn-principal">Adicionar</button>
        </div>
      </div>

      <div class="card">
        <h2>Gerenciar clientes sistema</h2>

        {/* id, nome, endereço, telefone e email. */}
        <div class="wrapperTable">
          <table id="clientes">
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>E-mail</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Leonardo</td>
              <td>Avenida Paulista</td>
              <td>12-93456-7890</td>
              <td>leo@leo.com</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Fabio Destro</td>
              <td>Rua da Sorte</td>
              <td>12-93456-7890</td>
              <td>fbfdestro@usp.br</td>
            </tr>
          </table>
        </div>
        <div class="text-right">
          <button class="btn-principal">Adicionar</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
