import React, {Suspense} from 'react'
import './App.css'
import {atom, selectorFamily, useRecoilCallback, useRecoilValue} from 'recoil'
import {getProfile} from './fakeApi'

const currentProfileIdState = atom({
    key: 'profileId',
    default: 1,
})

const profileState = selectorFamily({
    key: 'profile',

    // ✨ Get is now a function that _returns_ a selector
    //    get function for a given parameter
    get: (profileId: number) => {
        // ✨ Below is the actual selector get function
        return async () => {
            const profile = await getProfile(profileId)
            if (!profile) throw new Error('Profile not found')

            return profile
        }
    },
})

const Profile = () => {
    const currentProfileId = useRecoilValue(currentProfileIdState)
    const profile = useRecoilValue(profileState(currentProfileId))

    return (
        <div>
            <div>ID: {profile.id}</div>
            <div>Name: {profile.name}</div>
            <div>Twitter: {profile.twitter}</div>
            <div>Website: {profile.website}</div>
        </div>
    )
}

function App() {
    const currentProfileId = useRecoilValue(currentProfileIdState)

    const nextProfile = useRecoilCallback(({snapshot, set}) => (profileId: number) => {
        // ✨ Create the new selector instance
        //    to start fetching new profile.
        snapshot.getLoadable(profileState(profileId))

        // ✨ Change the currentProfileId to start
        //    rendering the new profile page.
        set(currentProfileIdState, profileId)
    })

    return (
        <div>
            <Suspense fallback={<div>Loading</div>}>
                <Profile />
            </Suspense>
            <button onClick={() => nextProfile(currentProfileId + 1)}>Next Profile</button>
        </div>
    )
}

export default App
