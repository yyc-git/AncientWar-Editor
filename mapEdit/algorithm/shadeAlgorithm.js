/**古代战争
 * 作者：YYC
 * 日期：2014-02-13
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var shadeAlgorithm = (function () {
    function _isMultiSprite(sprite) {
        return !!sprite.buildableGrid;
    }

    function _getRightDownGrid(gridPos, sprite) {
        return [gridPos[0] + sprite.buildableGrid.length - 1 , gridPos[1] + sprite.buildableGrid[sprite.buildableGrid.length - 1].length - 1];
    }

    function _getLeftDownGrid(gridPos, sprite) {
        return [gridPos[0], gridPos[1] + sprite.buildableGrid[sprite.buildableGrid.length - 1].length - 1 ];
    }

    function _targetIsLeftFromRelative(targetRightDownGridPos, relativeGridPos) {
        return targetRightDownGridPos[0] < relativeGridPos[0];
    }

    function _targetIsDownFromRelative(targetGridPos, targetLeftDownGridPos, relativeRightDownGridPos) {
        return (targetGridPos[1] > relativeRightDownGridPos[1]
            && targetLeftDownGridPos[0] < (relativeRightDownGridPos[0] + 1) );
    }

    return{
        //是否遮挡
        isShade: function (targetSprite, relativeSprite) {
            var targetGridPos = [Math.floor(targetSprite.gridX), Math.floor(targetSprite.gridY)] ,
                relativeGridPos = [Math.floor(relativeSprite.gridX), Math.floor(relativeSprite.gridY)],
                relativeRightDownGridPos = relativeGridPos,
                targetRightDownGridPos = targetGridPos,
                targetLeftDownGridPos = targetGridPos;

            if (_isMultiSprite(relativeSprite)) {
                relativeRightDownGridPos = _getRightDownGrid(relativeGridPos, relativeSprite);
            }
            if (_isMultiSprite(targetSprite)) {
                targetRightDownGridPos = _getRightDownGrid(targetGridPos, targetSprite);
                targetLeftDownGridPos = _getLeftDownGrid(targetGridPos, targetSprite);
            }


            if (_targetIsLeftFromRelative(targetRightDownGridPos, relativeGridPos)
                || _targetIsDownFromRelative(targetGridPos, targetLeftDownGridPos, relativeRightDownGridPos)){
                return true;
            }
            return false;
        },
        reSort: function (sprites) {
            var self = this;

            this.bubbleSort(function (a, b) {
                if (a.gridY > b.gridY) {
                    return 1;
                }
                return  -1;
            }, sprites);
            this.bubbleSort(function (a, b) {
                if (self.isShade(a, b)) {
                    return 1;
                }
                return  -1;
            }, sprites);
        },
        setZOrder: function (sprites, layer) {
            var i = 0,
                len = 0,
                index = 0;


            for (i = 0, len = sprites.length; i < len; i++) {
                layer.reorderChild(sprites[i], index);
                index += 1;
            }
        },
        /**
         * 冒泡排序
         * @param func
         * @param sprites
         * @returns {*}
         */
        bubbleSort: function (func, sprites) {
            var temp = null,
                i = 0,
                j;

            for (i = 0; i < sprites.length - 1; i++) {
                for (j = 0; j < sprites.length - i - 1; j++) {
//                    if (func(sprites[i], sprites[j]) > 0) {
//                        temp = sprites[j];
//                        sprites[j] = sprites[i];
//                        sprites[i] = temp;
                    if (func(sprites[j], sprites[j + 1]) > 0) {
                        temp = sprites[j + 1];
                        sprites[j + 1] = sprites[j];
                        sprites[j] = temp;
                    }
                }
            }

            return sprites;
        }
//        function bubbleSort(arr){ var temp; //先定义缓存 for(var i=0;i<arr.length-1;i++) { //一共比较n-1趟 for(var j=0;j<arr.length-i-1;j++) { //对当前无序区arr[i..n]自左向右扫描 if(arr[j]>arr[j+1]) { //交换 temp=arr[j]; arr[j]=arr[j+1]; arr[j+1]=temp; } } } return arr;}
    };
}());

