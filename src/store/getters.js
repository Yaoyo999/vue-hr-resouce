const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 建立全局的快捷访问
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.name // 建立name的快捷访问
}
export default getters
