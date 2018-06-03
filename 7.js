function SocialBook (users = [], posts = {}) { 
    this.users = users,
    this.posts = posts,
        // - getAllUsers() - возвращает массив всех пользователей
    this.getAllUsers = function(){
         return this.users.map(user=>user)
    },
    // - getUserByLogin(login) - ищет и возвращает объект пользователя с совпадающим логином

    this.getUserByLogin = function(login){
        const userByLogin = this.users.find(user=>user.login===login);
        if (!userByLogin) {
          return 'Такого пользователя нет'
        }
        return userByLogin
    },
  //   - getUserStatus(userId) - ищет пользователя по id и возвращает 'active' 
      // если isActive true, в противном случае возвращает 'inactive'.
    this.getUserStatus = function(id){
        const userStatus = this.users.find(user=>user.id===id);
        if (!userStatus){
          return 'Такого пользователя нет'
        }
        return userStatus.isActive ? "active" :"inactive";
    },
      //   - addUser(user) - принимает объект user с полями email и password и добавляет 
      // ему поля id(используя функцию getId) и isActive (false). Затем добавляет пользователя в 
      // свойство users самого экземпляра.
    this.addUser = function(user){
        user.id = getId();
        user.isActive = false;
        console.log(`Добавлен пользователь `, user);
        return this.users.push(user); 
    },
        // - removeUserById(userId) - удаляет пользователя из массива пользователей по полю id
    this.removeUserById = function(id){
        const userById = this.users.find(user=>user.id===id);
        if (!userById) {
          return 'Такого пользователя нет'
        }
        const removedUserById = this.users.filter(user=>user.id!==id)
        console.log(`Удален пользователь с ID `, id);
        this.users = removedUserById
        return removedUserById
    },
    // - getUsersCount() - возвращает общее количество пользователей
    this.getUsersCount = function(){
        return this.users.length
    },
        // - getUserPosts(userId) - возвращает массив постов пользователя с id равным userId
    this.getUserPosts = function(userId){
        return this.posts[userId]
    },
        // - addPost(userId, post) - добавляет post в поле posts объекта socialBook по ключу userId. 
    this.addPost = function(userId, post){
        this.posts[userId].push(post)
        const lastPost = this.posts[userId].length-1;
        return this.posts[userId][lastPost]
    },
      //   - removePost(userId, postId) - удаляет post с id равным postId из поля posts 
      // объекта socialBook по ключу userId
    this.removePost = function(userId, postId){
        const deletePost = this.posts[userId].filter(post=>post.id!==postId)
        // console.log(deletePost)
        this.posts[userId] = deletePost
        return this.posts[userId]
    },
        // - getAllLikes(userId) - возвращает сумму всех полей likes постов пользователя с id равным userId
    this.getAllLikes= function(userId){
        let sum = 0
        this.posts[userId].forEach(post => {
            sum+=post.likes
        });
        return sum
    },
      //   - addPostLike(userId, postId) - увеличивает значение поля likes на 1 у поста с id равным postId, 
      // для пользователя с id равным userId
    this.addPostLike = function(userId, postId){
        let addPostLike= this.posts[userId].find(post=>post.id==postId)
        return addPostLike.likes+=1
    },
      // - getPostsCount(userId) - возвращает общее количество постов пользователя с id равным userId
    this.getPostsCount = function(userId){
        const postsCount = this.posts[userId].length
        return postsCount
    }
 }
// Функция создающая уникальный ID 
const getId = () => "-" + Math.random().toString(36).substr(2, 9);

// Массив пользователей для экземпляра SocialBook
 const initialUsers = [
  { id: "-s19a6hqce", login: "mangozedog@mail.com", password: "qwe123zv", isActive: true },
  { id: "-qkpzenjxe", login: "polysweet@skynet.ze", password: "123zxc78", isActive: true },
  { id: "-e51cpd4di", login: "ajax2k@change.ua", password: "ert234qw", isActive: false }
];
  // Объект постов пользователей  экземпляра SocialBook

const initialPosts = {
  "-s19a6hqce": [
    { id: "-5sgljaskg", text: "post #1", likes: 3 },
    { id: "-199hb6igr", text: "post #2", likes: 5 },
    { id: "-hy0eyw5qo", text: "post #3", likes: 13 }
  ],
  "-qkpzenjxe": [
    { id: "-5tu69g5rf", text: "post #1", likes: 8 },
    { id: "-bje766393", text: "post #2", likes: 15 }
  ],
  "-e51cpd4di": [
    { id: "-9y6nkmlj4", text: "post #1", likes: 18 },
    { id: "-i03pbhy3s", text: "post #2", likes: 45 }
  ],
};
// Экземпляр SocialBook
let socialBookUnit = new SocialBook(initialUsers, initialPosts);

console.log( 'Массив всех пользователей', socialBookUnit.getAllUsers() );
console.log ('Найден пользователь', socialBookUnit.getUserByLogin('mangozedog@mail.com') );
console.log ('Статус активности' ,socialBookUnit.getUserStatus("-e51cpd4di"));
const user1 = { login: 'user1@gmail.com', password: 'pass123'};
socialBookUnit.addUser(user1);
console.log ('Оставшиеся пользователи',socialBookUnit.removeUserById("-s19a6hqce"));
console.log ('Количество пользователей:',socialBookUnit.getUsersCount());
console.log('Посты пользователя:',socialBookUnit.getUserPosts("-s19a6hqce"))
let newId = getId()
const newPost = { id: getId(), text: "Add something new", likes: 1 }
console.log('Пользователь добавил этот пост:',socialBookUnit.addPost("-s19a6hqce", newPost))
console.log('Пост удален',socialBookUnit.removePost("-s19a6hqce", "-5sgljaskg"))
console.log('Сумма постов',socialBookUnit.getAllLikes("-s19a6hqce"));
console.log( 'лайк', socialBookUnit.addPostLike("-s19a6hqce", "-199hb6igr"));
console.log( 'лайк', socialBookUnit.addPostLike("-s19a6hqce", "-199hb6igr"));
console.log('Всего постов', socialBookUnit.getPostsCount("-s19a6hqce"));