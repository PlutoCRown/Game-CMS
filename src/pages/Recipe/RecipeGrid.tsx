import React from 'react';
import { Tooltip } from 'antd';
import ItemIcon from '../Item/ItemIcon';
import { Recipe, RRecipe } from '@/types/Recipe';

const RecipeGrid: React.FC<{ recipe: RRecipe }> = ({ recipe }) => {
	return (
		<Tooltip title={recipe.name}>
			<div style={{ position: 'relative' }}>
				<ItemIcon item={recipe.products[0]} />
				{'num' in recipe && (
					<span
						style={{
							position: 'absolute',
							bottom: '0.2em',
							right: '0.5em',
							fontSize: 12,
							color: '#FFF',
							fontWeight: 900,
							WebkitTextStroke: '1px black',
						}}
					>
						{/* {recipe.num} */}
					</span>
				)}
			</div>
		</Tooltip>
	);
};

export default RecipeGrid;
