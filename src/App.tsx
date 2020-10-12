import React, {Suspense} from 'react'
import './App.css'
import {atom, selector, useRecoilValue} from 'recoil'
import {getProfile} from './fakeApi'
import {ErrorBoundary} from 'react-error-boundary'

const profileIdState = atom({
    key: 'profileId',
    default: 1,
})

const profileState = selector({
    key: 'profile',
    get: async ({get}) => {
        const profileId = get(profileIdState)

        const profile = await getProfile(profileId)
        if (!profile) throw new Error('Profile not found')

        return profile
    },
})

// ✨ This component will suspend while
//    profileState's async get function resolves
const Profile = () => {
    const profile = useRecoilValue(profileState)

    return (
        <div>
            <div>ID: {profile.id}</div>
            <div>Name: {profile.name}</div>
            <div>Twitter: {profile.twitter}</div>
            <div>Website: {profile.website}</div>
        </div>
    )
}

const ErrorPage = ({error}: {error?: Error}) => {
    return <div>{error?.message}</div>
}

function App() {
    return (
        // ✨ Use an ErrorBoundary to show an error state
        //    if Profile throws.
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Suspense fallback={<div>Loading</div>}>
                <Profile />
            </Suspense>
        </ErrorBoundary>
    )
}

export default App
