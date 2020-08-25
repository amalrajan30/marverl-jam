import React, { useState } from "react"
import styled from 'styled-components'
import '../index.css'
import { useSprings, animated, interpolate } from "react-spring"
import { useDrag } from 'react-use-gesture'

const images = [
	'http://i.annihil.us/u/prod/marvel/i/mg/2/d0/5232190d42df2/standard_xlarge.jpg',
	'http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350/standard_xlarge.jpg',
	'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087/standard_xlarge.jpg',
	'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/standard_xlarge.jpg',
	'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b/standard_xlarge.jpg'
]

const Grid = styled.div`
	display: grid;
	grid-template-columns: ${props => props.column};
	grid-template-rows: ${props => props.row};
	min-height: 100vh;
`

const Cards = styled(animated.div)`
	will-change: transform;
	position: absolute;
	display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`

const Card = styled(animated.div)`
	background-repeat: no-repeat;
	background-size: auto 100%;
	background-position: center center;
	width: 40vh;
	height: 40vh;
	/* cursor: grab; */
	box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3);
`

const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -2 + Math.random() * 5, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

const cardTrans = (rot, scale) => ` rotateX(5deg) rotateY(${rot / 10}deg) rotatez(${rot}deg) scale(${scale})`

export default function Home() {
	const [removed] = useState(() => new Set());
	const [cardAnimation, set] = useSprings(images.length, i => ({ from: from(i), ...to(i) }));

	const gesture = useDrag(({ args: [index], down, movement: [mx], distance, direction: [xDir], velocity }) => {
		console.log('velocity of drag:', velocity);
		const trigger = velocity > 0.2
		const dir = xDir < 0 ? -1 : 1
		if (!down && trigger) removed.add(index)
		set(i => {
			if (index !== i) return
			const isGone = removed.has(index)
			const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
			const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
			const scale = down ? 1.1 : 1
			return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
		})
		if (!down && removed.size === images.length) setTimeout(() => removed.clear() || set(i => to(i)), 600)
	})

	console.log('animations:', cardAnimation);

	return (
		<Grid column="10% 80% 10%" row="2.5rem auto 4rem">
			<div style={{ gridRow: '2/3', gridColumn: '2/3', padding: '30px', display: 'flex', justifyContent: 'center' }}>
				{
					cardAnimation.map(({ x, y, rot, scale }, i) => (
						<Cards key={i} style={{
							transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
						}}>
							<Card {...gesture(i)} style={{
								transform: interpolate([rot, scale], cardTrans),
								backgroundImage: `url(${images[i]})`
							}}/>
								{/* <Img src={images[i]} alt={i} />
							</Card> */}
						</Cards>
					))
				}
			</div>
		</Grid>
	)
}
