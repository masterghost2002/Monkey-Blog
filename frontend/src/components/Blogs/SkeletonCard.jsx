import React from 'react'
import { useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// global scope variabe
export default function BlogCard() {
    const themeSide = useSelector((state) => state.themeSide);
    const baseColor = themeSide === 'dark'?"#1A1A1A":"#EEEEEE";
    const highlightColor = themeSide === 'dark'?"#282828":"#d9d9d9";
    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            <>
                    <div className="col-lg-5 mt-4">
                        <div className={`card blog-card blog-card-${themeSide}`}>
                            <div className="container-fluid">
                                <Skeleton height={120} borderRadius="12px" />
                            </div>
                            <div className="card-body">
                                <div className="row card-detail">
                                    <div className="col-lg-6">
                                        <Skeleton height={20} />
                                    </div>
                                    <div className="col-lg-6 d-flex justify-content-end">
                                        <Skeleton height={20} width={100} />
                                    </div>
                                </div>
                                <Skeleton height={20} />
                                <Skeleton height={80} />
                            </div>
                            <hr className='divider-line'></hr>
                            <div className="card-body row">
                                <div className="col-lg-6 mb-1">
                                    <Skeleton height={20} />
                                </div>
                                <div className="col-lg-6 d-flex justify-content-end mb-1">
                                    <Skeleton height={20} width={100} />
                                </div>
                            </div>
                        </div>
                    </div>

            </>
        </SkeletonTheme>
    )
}
