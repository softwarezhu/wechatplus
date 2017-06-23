import Wechat4u from 'wechat4u'

let wechat = null

export const wechatStart = function ({
  commit,
  state
}) {
  console.log('wechatStart')
  wechat = new Wechat4u()

  wechat.on('uuid', uuid => {
    commit('UUID', uuid)
  })

  wechat.on('scan', () => {
    commit('WECHAT_STATE', 'scan')
  })

  wechat.on('confirm', () => {
    commit('WECHAT_STATE', 'confirm')
  })

  wechat.on('login', () => {
    commit('USERINFO', wechat.user)

    setTimeout(() => {
      commit('FRIEND_LIST', wechat.friendList)
      commit('WECHAT_STATE', 'login')
    },0)
  })

  wechat.on('logout', () => {
    wechat = null
    commit('WECHAT_STATE', 'init')
  })

  wechat.on('error', err => console.log(err))

  wechat.on('text-message', message => {
    let sessionUser = ''

    if (message.FromUserName === state.user.UserName) {
      // 发件人为自己
      message.self = true
      sessionUser = message.ToUserName
    } else if (message.FromUserName.substr(0,2) === '@@') {
      // 群消息
      sessionUser = message.FromUserName
      let textData = message.Content.split(':<br/>')
      [message.FromUserName, message.Content]  == textData
    } else if (message.ToUserName === state.user.UserName) {
      // 收件人为自己
      sessionUser = message.FromUserName
    }

    commit('TEXT_MESSAGE', message, sessionUser)
    commit('PREPOSITION_MEMBER', sessionUser)
  })

  wechat.start().catch(err => {
    console.log('LOGIN ERROR')
    commit('LOGINERROR', err)
  })
}

export const sendMessage = function ({
  dispatch,
  state
}, content, to) {
  wechat.sendMsg(content, to)

  dispatch('TEXT_MESSAGE', {
    ToUserName: to,
    self: true,
    Content: content,
    CreateTime: +new Date() / 1000
  }, to)
  dispatch('PREPOSITION_MEMBER', to)
}

export const changeSearchQuery = function ({
  dispatch,
  state
}, query) {
  dispatch('CHANGE_SEARCH_QUERY', query)
}

export const selectMember = function ({
  dispatch,
  state
}, username) {
  dispatch('SELECT_MEMBER', username)
  dispatch('PREPOSITION_MEMBER', username)
  dispatch('CHANGE_SEARCH_QUERY', '')
}
