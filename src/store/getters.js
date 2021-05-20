const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立全局的快捷访问
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.username, // 建立name的快捷访问
  userId: state => state.user.userInfo.userId, // 建立userId的快捷访问
  staffPhoto: state => state.user.userInfo.staffPhoto, // 建立staffPhoto的快捷访问
  companyId: state => state.user.userInfo.companyId, // companyId的快捷访问
  routes: state => state.permission.routes
}
export default getters
