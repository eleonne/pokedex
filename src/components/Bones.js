import { Dimensions } from 'react-native';

const window = Dimensions.get('window')
const screenWidth = window.width
const screenHeight = window.height

export const PodcastListHeaderBone = [
    { width: screenWidth, height: screenWidth + 20, marginBottom: 6, top: 0, },
    { 
        width: screenWidth, 
        height: 30, 
        marginBottom: 6,
        flexDirection: 'row',
        children: [
            { width: screenWidth/3, height:30, margin: 3},
            { width: screenWidth/3, height:30, margin: 3},
            { width: screenWidth/3, height:30, margin: 3},
        ],
    },
    { width: screenWidth, height: 50, marginBottom: 6 },
]

export const PodcastListBones = [
    ...PodcastListHeaderBone,
    { width: 50, height:10, margin: 3},
    { 
        width: screenWidth, 
        height: screenWidth / 3, 
        marginBottom: 6,
        flexDirection: 'row',
        children: [
            { width: screenWidth/3, height:screenWidth/3, margin: 3},
            { width: screenWidth/3, height:screenWidth/3, margin: 3},
            { width: screenWidth/3, height:screenWidth/3, margin: 3},
        ],
    },
]

export const PodcastDetailsBones = [
    { width: screenWidth, height: screenWidth/2 + 70, marginBottom: 6, top: 0, },
    { width: 150, height:10, margin: 3},
    { width: screenWidth, height:40, margin: 3},
    { 
        width: screenWidth, 
        height: 40, 
        // marginBottom: 6,
        flexDirection: 'row',
        children: [
            { width: screenWidth/2-6, height:30, margin: 3},
            { width: screenWidth/2-6, height:30, margin: 3},
        ],
    },
    { flex: 1, width: screenWidth - 6, margin: 3 },
]

export const CategoryBones = [
    { width: screenWidth, height: 40, marginBottom: 6, marginTop: 30 },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
    { width: screenWidth, height: 64, marginBottom: 6,  },
]

const participantDetailRow = {
    flexDirection: 'row',
    width: screenWidth,
    height: 76,
    marginBottom: 7,
    children: [
        {height: 76, width: 76, marginRight: 6},
        {
            flex: 1,
            children: [
                {width: screenWidth - 72, height: 20, marginBottom: 3},
                {width: screenWidth - 72, height: 30, marginBottom: 3},
                {width: screenWidth - 72, height: 20},
            ]
        },
    ]
}

const participantDetailsSocial = {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
}
export const ParticipantDetailsBones = [
    { width: 136, height: 136, borderRadius: 68, marginBottom: 6 },
    { width: screenWidth, height: 96, marginBottom: 6 },
    { 
        flexDirection: 'row', 
        justifyContent: 'center',
        children: [
            { ...participantDetailsSocial },
            { ...participantDetailsSocial },
            { ...participantDetailsSocial },
            { ...participantDetailsSocial },
            { ...participantDetailsSocial },
        ]
    },
    { width: screenWidth, height: 35, marginBottom: 6 },
    participantDetailRow,
    participantDetailRow,
    participantDetailRow,
    participantDetailRow,
    participantDetailRow,
]

export const FeedBones = [
    {
        flexDirection: 'row',
        width: screenWidth,
        height: 75,
        marginTop: 7,
        marginBottom: 7,
        children: [
            {height: 70, width: 70, marginRight: 6, borderRadius: 35}, 
            {height: 70, width: 70, marginRight: 6, borderRadius: 35},
            {height: 70, width: 70, marginRight: 6, borderRadius: 35},
            {height: 70, width: 70, marginRight: 6, borderRadius: 35},
            {height: 70, width: 70, marginRight: 6, borderRadius: 35},
            {height: 70, width: 70, marginRight: 6, borderRadius: 35},
            {height: 70, width: 70, marginRight: 6, borderRadius: 35},
            {height: 70, width: 70, marginRight: 6, borderRadius: 35},
        ]
    },
    { width: 150, height:10, marginTop: 10, marginBottom: 10},
    {height: screenWidth + 30, width: screenWidth},
    { width: 150, height:10, marginTop: 10, marginBottom: 10},
    { 
        width: screenWidth, 
        height: screenWidth / 3, 
        marginBottom: 6,
        marginLeft: 10,
        flexDirection: 'row',
        children: [
            { width: (screenWidth * 66 / 100), height:(screenWidth * 66 / 100), margin: 3},
            { width: (screenWidth * 66 / 100), height:(screenWidth * 66 / 100), margin: 3},
        ],
    },
]

export const StoryBones = [
    {flex: 1, width: screenWidth,height: 1000},
    {width: screenWidth, height: 42},
]

const serieRow = {
    flexDirection: 'row',
    width: screenWidth,
    height: 50,
    marginBottom: 10,
    children: [
        {height: 50, width: 50, marginRight: 6},
        {
            flex: 1,
            children: [
                {width: screenWidth - 72, height: 30, marginBottom: 3},
                {width: screenWidth - 72, height: 20, marginBottom: 3},
            ]
        },
    ]
};

export const SerieBones = [
    {height: (screenWidth * 66 / 100), width: screenWidth,},
    {height: 135, width: screenWidth, marginTop: 5},
    { width: 60, height:10, marginTop: 5, marginBottom: 10},
    serieRow,
    serieRow,
    serieRow,
    serieRow,
    serieRow,
    serieRow,
    serieRow,
]

export const ArticleBones = [
    {height: (screenWidth * 66 / 100), width: screenWidth,},
    {flex: 1, width: screenWidth, marginTop: 10},
]

export const PlayerBones = [
    {height: screenWidth + 30, width: screenWidth},
    {
        width: screenWidth, 
        height: 50, 
        alignItems: 'center',
        children: [
            {width: 200, height: 15, marginTop: 3, marginBottom: 3},
            {width: 300, height: 40},
        ]
    },
    {height: 15, width: screenWidth, marginTop: 20},
    {
        width: screenWidth, 
        height: 30, 
        marginTop: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        children: [
            {width: 50, height: 15},
            {width: 50, height: 15},
        ]
    },
    {
        width: screenWidth, 
        height: 30, 
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 100,
        justifyContent: 'space-evenly',
        children: [
            {width: 100, height: 100, borderRadius: 50},
            {width: 150, height: 150, borderRadius: 75},
            {width: 100, height: 100, borderRadius: 50},
        ]
    },
]

const upNextRow = {
    flexDirection: 'row',
    width: screenWidth,
    height: 76,
    marginBottom: 7,
    children: [
        {height: 76, width: 76, marginRight: 6},
        {
            flex: 1,
            children: [
                {width: screenWidth - 72, height: 20, marginBottom: 3},
                {width: screenWidth - 72, height: 30, marginBottom: 3},
                {width: screenWidth - 72, height: 20},
            ]
        },
    ]
}

export const UpNextBones = [
    {height: 15, width: 100, marginTop: 5, marginBottom: 5},
    upNextRow,
    {height: 15, width: 100, marginTop: 5, marginBottom: 5},
    upNextRow,
    upNextRow,
    upNextRow,
    upNextRow,
    upNextRow,
    upNextRow,
    upNextRow,
    upNextRow,
]

export const ParticipantsBarBones = [
    {
        flexDirection: 'row',
        width: screenWidth,
        height: 55,
        children: [
            {height: 35, width: 35, marginRight: 6, borderRadius: 25},
            {height: 35, width: 35, marginRight: 6, borderRadius: 25},
            {height: 35, width: 35, marginRight: 6, borderRadius: 25},
            {height: 35, width: 35, marginRight: 6, borderRadius: 25},
            {height: 35, width: 35, marginRight: 6, borderRadius: 25},
            {height: 35, width: 35, marginRight: 6, borderRadius: 25},
            {height: 35, width: 35, marginRight: 6, borderRadius: 25},
            {height: 35, width: 35, marginRight: 6, borderRadius: 25},
            {height: 35, width: 35, marginRight: 6, borderRadius: 25},
            {height: 35, width: 35, marginRight: 6, borderRadius: 25},
        ]
    },
]

const searchRow = {
    flexDirection: 'row',
    width: screenWidth,
    height: 76,
    marginBottom: 7,
    children: [
        {height: 76, width: 76, marginRight: 6},
        {
            flex: 1,
            children: [
                {width: screenWidth - 72, height: 20, marginBottom: 3},
                {width: screenWidth - 72, height: 30, marginBottom: 3},
                {width: screenWidth - 72, height: 20},
            ]
        },
    ]
}
export const SearchBones = [
    searchRow,
    searchRow,
    searchRow,
    searchRow,
    searchRow,
    searchRow,
    searchRow,
    searchRow,
    searchRow,
]

export const OriginalsBone = [
    { width: screenWidth, height: screenHeight * 0.7 + 30, marginBottom: 6, top: 0, },
    { width: 50, height:10, margin: 3},
    { 
        width: screenWidth, 
        height: screenWidth / 3, 
        marginBottom: 6,
        flexDirection: 'row',
        children: [
            { width: screenWidth/2, height:screenWidth/3, margin: 3},
            { width: screenWidth/2, height:screenWidth/3, margin: 3},
        ],
    },
]