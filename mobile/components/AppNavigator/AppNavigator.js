import React, { useCallback } from 'react'
import BottomNavigation, {
  IconTab,
  Badge
} from 'react-native-material-bottom-navigation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function AppNavigator(props) {

    const { navigator } = props

    // state = {
    //     activeTab: 'rocket'
    // }

    const [activeTab, setActiveTab] = React.useState('Home')

    tabs = [
        {
        key: 'Home',
        label: 'Rocket',
        barColor: '#388E3C',
        pressColor: 'rgba(255, 255, 255, 0.16)',
        icon: 'rocket'
        },
        // {
        // key: 'Home',
        // label: 'Movies & TV',
        // barColor: '#00695C',
        // pressColor: 'rgba(255, 255, 255, 0.16)',
        // icon: 'film'
        // },
        // {
        // key: 'Home',
        // label: 'Music',
        // barColor: '#6A1B9A',
        // pressColor: 'rgba(255, 255, 255, 0.16)',
        // icon: 'music'
        // },

        {
        key: 'Login',
        label: 'Cerrar Sesion',
        barColor: '#1565C0',
        pressColor: 'rgba(255, 255, 255, 0.16)',
        icon: 'sign-out-alt'
        }
    ]

    // state = {
    //     activeTab: this.tabs[0].key
    // }

    renderIcon = icon => ({ isActive }) => (
        <FontAwesome5 size={24} color="white" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <IconTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    // const handleTabPress = useCallback(
    //     newTab => navigator.navigate(newTab.key),
    //     [navigator]
    //   )

    return (
        <BottomNavigation
            tabs={this.tabs}
            activeTab={activeTab}
            // onTabPress={newTab => React.setState({ activeTab: newTab.key })}
            onTabPress={newTab => setActiveTab(newTab.key)}
            // onTabPress={newTab => navigator.navigate(newTab.key)}
            renderTab={this.renderTab}
            useLayoutAnimation
        />
    )
}