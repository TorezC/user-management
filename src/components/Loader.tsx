import React from 'react'
interface LoaderProps {
    color: string
    spacing?: string
}

const Loader: React.FC<LoaderProps> = ({color, spacing}) => {
    return (
        <div className={`${spacing} flex justify-center  items-center w-full`} >
            <div
                className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] ${color}`}
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
    )
}

export default Loader