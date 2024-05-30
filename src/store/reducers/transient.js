import {
    SHOW_PARTICIPANT_DETAIL,
    HIDE_PARTICIPANT_DETAIL,
    LOADING_PARTICIPANT,
    PARTICIPANT_LOADED,
    LOADING_USER,
    USER_LOADED,
    PODCAST_LIST_LOADED,
    PODCAST_LIST_LOADING,
    PODCAST_HEADER_LOADING,
    PODCAST_HEADER_LOADED,
    PODCAST_LOADING,
    PODCAST_LOADED,
    PODCAST_LIKE_LOADED,
    PODCAST_LIKE_LOADING,
    HIDE_PODCAST_COMMENTS,
    SHOW_PODCAST_COMMENTS,
    SHOW_PLAYER_SCREEN,
    HIDE_PLAYER_SCREEN,
    SHOW_UPNEXT_SCREEN, 
    HIDE_UPNEXT_SCREEN,
    LOADING_TRACK,
    TRACK_LOADED,
    PLAY_CURRENT_TRACK,
    PAUSE_CURRENT_TRACK,
    STOP_PLAYER,
    PODCAST_BY_CATEGORY_LOADING,
    PODCAST_BY_CATEGORY_LOADED,
    LOADING_SEARCH,
    SEARCH_LOADED,
    FEED_LOADED,
    LOADING_FEED,
    SELECTED_FEED_LOADED,
    LOADING_SELECTED_FEED,
    PLAY_VIDEO,
    PAUSE_VIDEO,
    LOADING_PLAYER,
    PLAYER_LOADED,
    LOADING_DOWNLOADED,
    DOWNLOADED_LOADED,
    LOADING_MEDIA_COMMENTS,
    MEDIA_COMMENTS_LOADED,
    LOADING_MORE_COMMENTS,
    MORE_COMMENTS_LOADED,
    LOADING_MEDIA_CHILDREN_COMMENTS,
    MEDIA_CHILDREN_COMMENTS_LOADED,
    LOADING_MORE_CHILDREN_COMMENTS,
    MORE_CHILDREN_COMMENTS_LOADED,
    LOADING_MEDIA_ADD_COMMENTS,
    MEDIA_ADD_COMMENTS_LOADED,
    LOADING_PARTICIPANTS_FOR_MEDIA,
    PARTICIPANTS_FOR_MEDIA_LOADED,
    LOADING_SUBSCRIPTION,
    SUBSCRIPTION_LOADED,
    LOADING_MORE_FEED,
    MORE_FEED_LOADED,
    LOADING_STORY_IMAGE,
    STORY_IMAGE_LOADED,
    LOADING_STORY_AD,
    STORY_AD_LOADED,
    LOADING_USER_DATA,
    USER_DATA_LOADED,
    SHARE_LOADED,
    LOADING_SHARE,
    ORIGINALS_LOADED,
    LOADING_ORIGINALS,
    SHORT_DETAILS_LOADED,
    LOADING_SHORT_DETAILS,
    LOADING_SHORT_COMPILED,
    SHORT_COMPILED_LOADED,
    LOADING_SHORT_ITEM,
    SHORT_ITEM_LOADED,
    LOADING_TOS,
    TOS_LOADED,
} from '../actions/actionTypes'

const initialState = {
    showParticipantDetails: false,
    showPodcastComments: false,
    showPlayer: false,
    showUpNext: false,
    isPlaying: false,
    isPlayingVideo: false,
    isLoadingParticipant: false,
    isLoadingParticipantsForMedia: false,
    isLoadingLogin: false,
    isLoadingPodcastList: true,
    isLoadingPodcastHeader: true,
    isLoadingPodcastDetails: false,
    isLoadingPodcastLike: false,
    isLoadingTrack: false,
    isLoadingPlayer: false,
    isLoadingPodcastsByCategory: false,
    isLoadingSearch: false,
    isLoadingFeed: true,
    isLoadingSelectedFeed: true,
    isLoadingDownloaded: false,
    isLoadingMediaComments: false,
    isLoadingMediaChildrenComments: false,
    isLoadingMoreChildrenComments: false,
    isLoadingAddComments: false,
    isLoadingSubscription: false,
    isLoadingMoreFeed: false,
    isLoadingStoryImage: false,
    isLoadingStoryAd: false,
    isLoadingUserData: false,
    isLoadingShare: false,
    isLoadingOriginals: false,
    isLoadingShortDetails: false,
    isLoadingShortCompiled: false,
    isLoadingShortItem: false,
    isLoadingTOS: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_TOS:
            return {
                ...state,
                isLoadingTOS: true
            }
        case TOS_LOADED:
            return {
                ...state,
                isLoadingTOS: false
            }

        case LOADING_SHORT_ITEM:
            return {
                ...state,
                isLoadingShortItem: true
            }
        case SHORT_ITEM_LOADED:
            return {
                ...state,
                isLoadingShortItem: false
            }

        case LOADING_SHORT_COMPILED:
            return {
                ...state,
                isLoadingShortCompiled: true
            }
        case SHORT_COMPILED_LOADED:
            return {
                ...state,
                isLoadingShortCompiled: false
            }

        case LOADING_SHORT_DETAILS:
            return {
                ...state,
                isLoadingShortDetails: true
            }
        case SHORT_DETAILS_LOADED:
            return {
                ...state,
                isLoadingShortDetails: false
            }

        case LOADING_ORIGINALS:
            return {
                ...state,
                isLoadingOriginals: true
            }
        case ORIGINALS_LOADED:
            return {
                ...state,
                isLoadingOriginals: false
            }

        case LOADING_SHARE:
            return {
                ...state,
                isLoadingShare: true
            }
        case SHARE_LOADED:
            return {
                ...state,
                isLoadingShare: false
            }

        case LOADING_USER_DATA:
            return {
                ...state,
                isLoadingUserData: true
            }
        case USER_DATA_LOADED:
            return {
                ...state,
                isLoadingUserData: false
            }
        case LOADING_STORY_AD:
            return {
                ...state,
                isLoadingStoryAd: true,
            }
        case STORY_AD_LOADED:
            return {
                ...state,
                isLoadingStoryAd: false,
            }

        case LOADING_STORY_IMAGE:
            return {
                ...state,
                isLoadingStoryImage: true,
            }
        case STORY_IMAGE_LOADED:
            return {
                ...state,
                isLoadingStoryImage: false,
            }
        case SHOW_PARTICIPANT_DETAIL:
            return {
                ...state,
                showParticipantDetails: true,
            }
        case HIDE_PARTICIPANT_DETAIL:
            return {
                ...state,
                showParticipantDetails: false,
            }
        case LOADING_PARTICIPANT:
            return {
                ...state,
                isLoadingParticipant: true,
            }
        case PARTICIPANT_LOADED:
            return {
                ...state,
                isLoadingParticipant: false,
            }
        case LOADING_USER:
            return {
                ...state,
                isLoadingLogin: true,
            }
        case USER_LOADED:
            return {
                ...state,
                isLoadingLogin: false,
            }
        case PODCAST_LIST_LOADED:
            return {
                ...state,
                isLoadingPodcastList: false,
            }
        case PODCAST_LIST_LOADING:
            return {
                ...state,
                isLoadingPodcastList: true,
            }
        case PODCAST_HEADER_LOADING:
            return {
                ...state,
                isLoadingPodcastHeader:  true
            }
        case PODCAST_HEADER_LOADED:
            return {
                ...state,
                isLoadingPodcastHeader:  false
            }
        case PODCAST_LOADING:
            return {
                ...state,
                isLoadingPodcastDetails: true
            }
        case PODCAST_LOADED:
            return {
                ...state,
                isLoadingPodcastDetails: false
            }
        case PODCAST_LIKE_LOADING:
            return {
                ...state,
                isLoadingPodcastLike: true
            }
        case PODCAST_LIKE_LOADED:
            return {
                ...state,
                isLoadingPodcastLike: false
            }
        case HIDE_PODCAST_COMMENTS:
        return {
            ...state,
            showPodcastComments: false
        }
        case SHOW_PODCAST_COMMENTS:
            return {
                ...state,
                showPodcastComments: true
            }
        case SHOW_PLAYER_SCREEN:
            return {
                ...state,
                showPlayer: true,
            }
        case HIDE_PLAYER_SCREEN:
            return {
                ...state,
                showPlayer: false,
            }
        case SHOW_UPNEXT_SCREEN:
            return {
                ...state,
                showUpNext: true,
            }
        case HIDE_UPNEXT_SCREEN:
            return {
                ...state,
                showUpNext: false,
            }
        case LOADING_TRACK:
            return {
                ...state,
                isLoadingTrack: true,
            }
        case TRACK_LOADED:
            return {
                ...state,
                isLoadingTrack: false,
            }
        case LOADING_PLAYER:
            return {
                ...state,
                isLoadingPlayer: true,
            }
        case PLAYER_LOADED:
            return {
                ...state,
                isLoadingPlayer: false,
            }
        case PLAY_CURRENT_TRACK:
            return {
                ...state,
                isPlaying: true
            }
        case PAUSE_CURRENT_TRACK:
            return {
                ...state,
                isPlaying: false
            }
        case STOP_PLAYER:
            return {
                ...state,
                isPlaying: false,
                showPlayer: initialState.showPlayer,
                showUpNext: initialState.showUpNext,
            }
        case PODCAST_BY_CATEGORY_LOADING:
            return {
                ...state,
                isLoadingPodcastsByCategory: true,
            }
        case PODCAST_BY_CATEGORY_LOADED:
            return {
                ...state,
                isLoadingPodcastsByCategory: false,
            }
        case LOADING_SEARCH:
            return {
                ...state,
                isLoadingSearch: true,
            }
        case SEARCH_LOADED:
            return {
                ...state,
                isLoadingSearch: false,
            }
        case LOADING_FEED:
            return {
                ...state,
                isLoadingFeed: true,
            }
        case FEED_LOADED:
            return {
                ...state,
                isLoadingFeed: false,
            }
        case LOADING_SELECTED_FEED:
            return {
                ...state,
                isLoadingSelectedFeed: true,
            }
        case SELECTED_FEED_LOADED:
            return {
                ...state,
                isLoadingSelectedFeed: false,
            }
        case LOADING_DOWNLOADED:
            return {
                ...state,
                isLoadingDownloaded: true,
            }
        case DOWNLOADED_LOADED:
            return {
                ...state,
                isLoadingDownloaded: false,
            }
        case PLAY_VIDEO:
            return {
                ...state,
                isPlaying: false,
                isPlayingVideo: true,
            }
        case PAUSE_VIDEO:
            return {
                ...state,
                isPlayingVideo: false,
                isPlaying: false,
            }
        case LOADING_MEDIA_COMMENTS:
            return {
                ...state,
                isLoadingMediaComments: true,
            }
        case MEDIA_COMMENTS_LOADED:
            return {
                ...state,
                isLoadingMediaComments: false,
            }
        case LOADING_MORE_COMMENTS:
            return {
                ...state,
                isLoadingMoreComments: true,
            }
        case MORE_COMMENTS_LOADED:
            return {
                ...state,
                isLoadingMoreComments: false,
            }
        case LOADING_MEDIA_CHILDREN_COMMENTS:
            return {
                ...state,
                isLoadingMediaChildrenComments: true,
            }
        case MEDIA_CHILDREN_COMMENTS_LOADED:
            return {
                ...state,
                isLoadingMediaChildrenComments: false,
            }
        case LOADING_MORE_CHILDREN_COMMENTS:
            return {
                ...state,
                isLoadingMoreChildrenComments: true,
            }
        case MORE_CHILDREN_COMMENTS_LOADED:
            return {
                ...state,
                isLoadingMoreChildrenComments: false,
            }
        case LOADING_MEDIA_ADD_COMMENTS:
            return {
                ...state,
                isLoadingAddComments: true,
            }
        case MEDIA_ADD_COMMENTS_LOADED:
            return {
                ...state,
                isLoadingAddComments: false,
            }
        case LOADING_PARTICIPANTS_FOR_MEDIA:
            return {
                ...state,
                isLoadingParticipantsForMedia: true,
            }
        case PARTICIPANTS_FOR_MEDIA_LOADED:
            return {
                ...state,
                isLoadingParticipantsForMedia: false,
            }
        case LOADING_SUBSCRIPTION:
            return {
                ...state,
                isLoadingSubscription: true,
            }
        case SUBSCRIPTION_LOADED:
            return {
                ...state,
                isLoadingSubscription: false,
            }
        case LOADING_MORE_FEED:
            return {
                ...state,
                isLoadingMoreFeed: true,
            }
        case MORE_FEED_LOADED:
            return {
                ...state,
                isLoadingMoreFeed: false,
            }
        default:
            return state
    }
}

export default reducer;