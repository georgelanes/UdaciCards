import { NavigationActions } from 'react-navigation'

export function toHome (navigation) {
    if(navigation)
        navigation.navigate('Decks','')
}