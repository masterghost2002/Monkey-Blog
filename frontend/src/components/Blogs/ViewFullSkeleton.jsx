import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux';
export default function ViewFullSkeleton() {
    const themeSide = useSelector((state) => state.themeSide);
    const baseColor = themeSide === 'dark' ? "#1A1A1A" : "#EEEEEE";
    const highlightColor = themeSide === 'dark' ? "#282828" : "#d9d9d9";
    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            <section className='view_full_blog'>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className={`card card-full card-full-${themeSide}`} >
                                <div className="card-detail card-header row">
                                    <div className="col-lg-6">
                                        <Skeleton height={30} />
                                    </div>
                                    <div className="col-lg-6 d-flex justify-content-end">
                                        <Skeleton height={30} width={180} />
                                    </div>

                                </div>
                                <div id="content">
                                    <div className="card-body card-full-body">
                                    <Skeleton height={30}/>
                                    <Skeleton height={200}/>
                                    </div>
                                    <hr></hr>
                                    <div className="card-body d-flex justify-content-between">
                                        <Skeleton height={30} width={180} />
                                        <Skeleton height={30} width={180} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SkeletonTheme>

    )
}
