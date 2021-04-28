export default function ({store}) {
    store.dispatch('getUserInfo')
    store.dispatch('getShopsInfo')
    store.dispatch('getSkpRepoData')
}