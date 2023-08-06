1. git config
Quando você está utilizando o Git pela primeira vez ou com uma instalação nova, em um projeto colaborativo, esse comando é fundamental para configurar sua identidade de usuário, inserindo informações como nome e email que serão empregadas em cada commit.

Exemplo:

$ git config –global user.name “Seu nome”

$ git config –global user.email “Seu email”

2. git init
Esse é o comando que você irá utilizar para criar um novo projeto de git. O comando irá criar um repositório novo em branco e, a partir daí, será possível armazenar seu código fonte, alterar, salvaguardar alterações etc.

Exemplo:

$ git init

Se você já possui um repositório anterior ou deseja criar um repositório com um nome em específico, você pode passar o nome como parâmetro do comando:

$ git init <O nome do seu repositório>

3. git clone
Esse comando Git cria uma cópia exata de um repositório já existente.

Então… quando usar git init e quando usar git clone? O git clone é mais avançado, uma vez que ele mesmo executa um comando git init internamente. Além disso, ele verifica todo o conteúdo do projeto.

Exemplo:

git clone <URL do seu projeto>

4. git add


Esse comando Git adiciona os arquivos especificados de código ao seu repositório, sejam arquivos novos ou arquivos anteriores que foram alterados. Oferece diferentes possibilidades de sintaxe.

Exemplo:

$ git add seu_arquivo (esse comando irá adicionar o arquivo em específico ao repositório)

$ git add * (esse comando irá adicionar todos os arquivos novos e/ou modificados ao repositório)

5. git commit
É fundamental se estabelecer uma diferença entre git add e git commit:

git add adiciona seus arquivos modificados à fila para serem submetidos a um commit posteriormente. Os arquivos não passaram por um commit.
O git commit executa o commit dos arquivos que foram adicionados e cria uma nova revisão com um log. Por outro lado, se você não adicionar nenhum arquivo, o git não fará o commit de nada.
É possível combinar as duas ações em um único comando: $ git commit -a.

Também é possível adicionar uma mensagem para a execução de um commit. Exemplo:

<!-- $ git commit -m “seu comentário”.. -->


51. git remote add origin https://github.com/emersonmarins/mongodb.git
<!-- ADD to remote repository -->
52. git branch -M main
53. git push -u origin main


6. git branch
É comum na maior parte do tempo possuir múltiplas variações em seu repositório Git, chamadas de branches (“ramificações”). A grosso modo, um branch é um caminho independente de desenvolvimento, uma alternativa.

A princípio pode parecer fácil se perder em diversos caminhos, mas o comando git branch facilita o gerenciamento de tudo isso. Com diferentes parâmetros, é possível listar, criar ou apagar os branches.

Exemplos:

<!-- $ git branch (lista todas as ramificações) -->

<!-- % $ git branch <nome_do_branch> (cria um branch com o nome especificado) -->

<!-- $ git branch -d <nome_do_branch> (deleta o branch com o nome especificado) -->

==============================================================================




git clone <https://link-com-o-nome-do-repositório>

========================================================

Como criar uma branch:

git branch <nome-da-branch>
Esse comando criará uma branch em seu local de trabalho. Para fazer o push (algo como enviar) da nova branch para o repositório remoto, você precisa usar o comando a seguir:

git push -u <local-remoto> <nome-da-branch>
Como ver as branches:

git branch ou git branch --list
Como excluir uma branch:

git branch -d <nome-da-branch>

==========================================================


git checkout <nome-da-branch>
Existem alguns passos que você precisa seguir para trocar de branch com sucesso:

As alterações em sua branch atual devem estar em um commit ou em um stash antes de você fazer a troca
A branch na qual você quer fazer o checkout deve existir no seu espaço de trabalho local
Também existe um comando de atalho que permite criar e automaticamente trocar para a branch criada ao mesmo tempo:

git checkout -b <nome-da-branch>
Esse comando cria a branch em seu espaço de trabalho local (a flag -b representa a branch) e faz o checkout na nova branch logo após sua criação


==============================================================

git status

===============================================================



Git add
Ao criarmos, modificarmos ou excluirmos um arquivo, essas alterações acontecerão em nosso espaço de trabalho local e não serão incluídas no próximo commit (a menos que alteremos as configurações).

Precisamos usar o comando git add para incluir as alterações de um ou vários arquivos em nosso próximo commit.

Para adicionar um único arquivo:

git add <arquivo>

Para adicionar tudo ao mesmo tempo:

git add -A

===================================================================

Git commit
Talvez esse seja o comando mais usado do Git. Quando chegamos a determinado ponto em desenvolvimento, queremos salvar nossas alterações (talvez após uma tarefa ou resolução de problema específica).

Git commit é como definir um ponto de verificação no processo de desenvolvimento. Você pode voltar a esse ponto mais tarde, se necessário.

Também precisamos escrever uma mensagem breve para explicar o que desenvolvemos ou alteramos no código-fonte.

git commit -m "mensagem do commit"


=======================================================================

Git push
Após fazer o commit de suas alterações, a próxima coisa a fazer é enviar suas alterações ao servidor remoto. Git push faz o upload dos seus commits no repositório remoto.

git push <repositório-remoto> <nome-da-branch>
Entretanto, se a sua branch foi recém-criada, também é preciso fazer o upload da branch com o seguinte comando:

git push --set-upstream <repositório-remoto> <nome-da-branch>
ou

git push -u origin <nome-da-branch>


============================================================

Git pull
O comando git pull é usado para obter as atualizações de um repositório remoto. Esse comando é uma combinação de git fetch e git merge, o que significa que, quando usamos git pull, ele recebe as atualizações do repositório remoto (git fetch) e aplica imediatamente as alterações mais recentes em seu espaço de trabalho local (git merge).

git pull <repositório-remoto>

============================================================================


Git revert
Às vezes, precisamos desfazer as alterações que fizemos. Existem várias maneiras de se desfazer as alterações em nosso espaço de trabalho local ou remotamente (dependendo do que você necessita), mas devemos usar esses comandos com cuidado para evitar exclusões indesejadas.

Uma maneira segura de desfazer nossos commits é usando git revert. Para ver nosso histórico de commits, primeiro, precisamos usar git log -- oneline:

resim
Histórico de commits da minha branch master
Em seguida, precisamos apenas especificar o código hash ao lado do commit que desejamos desfazer:

git revert 3321844
Depois disso, você verá uma tela igual ao que vemos abaixo - basta pressionar shift + q para sair:


============================================================================

Git merge
Quando você concluir o desenvolvimento em sua branch e quando tudo funcionar bem, a etapa final é fazer o merge (mesclar ou unir, em português) da branch com a branch pai (dev ou master/main, em geral). Isso é feito com o comando git merge.

Git merge, basicamente, integra sua branch com o recurso e todos os seus commits na branch de desenvolvimento (dev) ou na branch principal (master ou main). É importante lembrar que, primeiro, você precisa estar na branch específica na qual você quer fazer o merge de sua branch com o recurso.

Por exemplo, ao querer fazer o merge de sua branch do recurso na branch dev:

Primeiro, troque para a branch dev:

git checkout dev
Antes do merge, atualize sua branch dev local:

git fetch
Por fim, faça o merge da sua branch do recurso em dev:

git merge <nome-da-branch-com-o-recurso>
Dica: certifique-se de que sua branch dev tem a versão mais recente antes de fazer o merge de suas branches de recurso. Do contrário, você pode ter que lidar com conflitos e outros problemas indesejados.


==========================================================
CREATE KEY SSH
ssh-keygen -t ed25519 -C "emersonmarinscoutinho@gmail.com"
eval "$(ssh-agent -s)" <!-- Start key ssh -->
ssh-add ~/.ssh/id_ed25519
ssh-keygen -t ed25519-sk -C "emersonmarinscoutinho@gmail.com"
cat ~/.ssh/id_ed25519.pub <!-- Copy key ssh -->
