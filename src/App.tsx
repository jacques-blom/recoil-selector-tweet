import React, {Suspense} from 'react'
import './App.css'
import {
    atom,
    selectorFamily,
    useRecoilCallback,
    useRecoilStateLoadable,
    useRecoilValue,
    useRecoilValueLoadable,
} from 'recoil'
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

// ✨ Profile will no longer suspend...
const Profile = () => {
    const currentProfileId = useRecoilValue(currentProfileIdState)

    // ✨ ...because we swapped useRecoilValue for useRecoilValueLoadable
    const profile = useRecoilValueLoadable(profileState(currentProfileId))

    // ✨ Handle the loading state
    if (profile.state === 'loading') {
        return <div>Loading</div>
    }

    // ✨ Handle the error state
    if (profile.state === 'hasError') {
        const error = profile.contents
        return <div>Error {error.message}</div>
    }

    // ✨ Finally, handle the loaded state
    return (
        <div>
            <div>ID: {profile.contents.id}</div>
            <div>Name: {profile.contents.name}</div>
            <div>Twitter: {profile.contents.twitter}</div>
            <div>Website: {profile.contents.website}</div>
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
