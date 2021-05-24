import {GiBattleAxe, GiShieldImpact, GiBrain, GiPowerLightning,  GiMuscleUp} from 'react-icons/gi'
import {FaRunning} from 'react-icons/fa'

// How do you identify which icon in the array represents each stat? From whay I understood in the code of `Cards.js` it's kinda lucky, you expect that the endpoint returns the 
// properties always in the same order and there is no guarantee of that: https://www.json.org/json-en.html see: An object is an unordered set of name/value pairs.
// How would you change this export to make it reliable? 
export const icons = [
    {
        icon : <GiBattleAxe/>
    },
    {
        icon : <GiShieldImpact/>
    },
    {
        icon : <GiBrain/>
    },
    {
        icon : <GiPowerLightning/>
    },
    {
        icon : <FaRunning/>
    },
    {
        icon : <GiMuscleUp/>
    }
]
