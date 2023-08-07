import styled from "styled-components";
import images from "../../../assets/image-links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductContainer = styled.div`
	max-width: 1350px;
	min-height: 500px;
	border-radius: 10px;

	display: flex;
	justify-content: center;
	padding: 20px;

	flex-wrap: wrap;
	background-color: #79829a;

	margin-bottom: 50px;
`;

const ProductCard = styled.div`
	height: 300px;
	width: 200px;
	margin: 20px;
	border-radius: 10px;

	position: relative;

	:hover {
		cursor: pointer;
	}

	img {
		top: 0;
		height: 300px;
		width: 200px;
		object-fit: cover;
		object-position: top;
	}

	h1 {
		position: absolute;
		font-size: 1em;
		z-index: 1;
		top: 1;
		left: 1;

		padding: 10px 0 0 10px;
		color: #000;
	}

	p {
		position: absolute;
		font-size: 1em;
		z-index: 1;
		top: 40;
		left: 10;

		padding: 30px 0 0 10px;
		color: #000;
	}

	.icon {
		position: absolute;
		top: 0;
		right: 0;
		height: 18px;

		padding: 10px 10px 0 0;
	}

	.icon:hover {
		cursor: pointer;
		color: red;
	}

	.favorite {
	}

	overflow: hidden;
`;

const CrudProductCards = ({ data }) => {
	return (
		<ProductContainer>
			{data.map((item, index) => {
				return (
					<ProductCard key={index}>
						<h1>{item.name}</h1>
						<p>₱ {item.price}</p>
						<FontAwesomeIcon icon={faHeart} className="icon" />
						<img src={images[Math.floor(Math.random() * 10)]} alt="image" />
					</ProductCard>
				);
			})}
		</ProductContainer>
	);
};

export default CrudProductCards;
