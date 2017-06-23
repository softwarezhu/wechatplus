
const mutations = {

    // 微信状态
    UUID (state, uuid) {
        state.uuid = uuid
        state.wechatState = 'uuid'
    },

    WECHAT_STATE (state, wechatState) {
        state.wechatState = state.wechatState
    },

    // 用户数据
    USERINFO (state, user) {
        state.user = user
    },

    FRIEND_LIST (state, friendList) {
        state.memberList = friendList

        for (let member of friendList) {
            state.sessionList.push({
                username: member['username'],
                nickname: member['nickname'],
                messages: []
            })
        }

        state.session = state.sessionList[0]
        // 登陆用户头像
        state.user.avatar = friendList.find(member => member.username === state.user.UserName).avatar
    },

    // 消息
    TEXT_MESSAGE (state, message, sessionUser) {
        state.sessionList
            .find(session => session.username === sessionUser)
            .messages.push(message)
    },

    // 界面
    CHANGE_SEARCH_QUERY (state, query) {
        state.query = query
    },

    SELECT_MEMBER (state, username) {
        state.session = state.sessionList.find(session => session.username === username)
    },

    PREPOSITION_MEMBER (state, activeUsername) {
        let activeMemberIndex = state.memberList.findIndex(member => member.username === activeUsername)
        let activeMember = state.memberList.splice(activeMemberIndex, 1)[0]
        state.memberList.unshift(activeMember)
    }
}
export default mutations