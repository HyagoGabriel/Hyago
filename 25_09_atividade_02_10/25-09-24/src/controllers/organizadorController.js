let orgs = [];
let id_org = 0;

module.exports = class orgController {
  static async createOrg(req, res) {
    const { nome, email, senha, telefone } = req.body; 

    if (!nome || !email || !senha || !telefone) { 
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(telefone) || telefone.length !== 11) {
      return res.status(400).json({ error: "Telefone inválido, deve conter exatamente 11 numéricos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido, deve conter @" });
    }

    // Verifica se já existe um usuário com o mesmo telefone
    const existingOrg = orgs.find(org => org.telefone === telefone);
    if (existingOrg) {
      return res.status(400).json({ error: "Telefone já foi cadastrado" });
    }

    // Cria e adiciona novo usuário
    id_org += 1;

    const existingOrgtelefone = orgs.find((org) => org.telefone === telefone);
    if (existingOrgtelefone) {
      return res.status(400).json({ error: "Telefone já cadastrado" });
    }

    const existingOrgemail = orgs.find((org) => org.email === email);
    if (existingOrgemail) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const novoOrg = { nome, email, senha, telefone, id_org };    
    orgs.push(novoOrg);

    return res.status(201).json({ message: "Usuário criado com sucesso", org: novoOrg });
  }

  static async getAllOrgs(req, res) {
    return res.status(200).json({ message: "Obtendo todos os usuários", orgs });
  }

  static async updateOrg(req, res) {
    const { nome, email, senha, telefone, id_organizador } = req.body;  

    if (!nome || !email || !senha || !telefone) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    // procura índice do usuário no array 'orgs' pelo telefone
    const orgIndex = orgs.findIndex((org) => org.id_organizador == id_organizador);
    
    // se não for encontrado o 'orgIndex' equivale a -1
    if (orgIndex == -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    
    // atualiza os dados do usuário no array 'orgs'
    orgs[orgIndex] = { ...orgs[orgIndex], nome, email, senha, telefone };
    return res.status(200).json({ message: "Usuário atualizado", org: orgs[orgIndex] });
  }

  static async deleteOrg(req, res) {
    const orgId = req.params.id_org;
    const orgIndex = orgs.findIndex((org) => org.id_org == orgId);
    // se não for encontrado o 'userindex' equivale a -1
    if (orgIndex == -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    // removendo usuário da array 'users'
    orgs.splice(orgIndex, 1) // começa no indice 'userIndex', e apaga somente '1'
    return res.status(200).json({ message: "Usuário apagado", orgs });
  }
};
