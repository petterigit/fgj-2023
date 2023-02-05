import * as ex from 'excalibur';

export class PostProcessor implements ex.PostProcessor {
    private _shader: ex.ScreenShader | null = null;
    initialize(gl: WebGLRenderingContext): void {
        this._shader = new ex.ScreenShader(
            `#version 300 es
    precision mediump float;

    // our texture
    uniform sampler2D u_image;

    // the texCoords passed in from the vertex shader.
    in vec2 v_texcoord;

    out vec4 fragColor;

    void main() {
      vec4 tex = texture(u_image, v_texcoord);
      float avg = 0.2126 * tex.r + 0.7152 * tex.g + 0.0722 * tex.b;
      fragColor = vec4(avg, avg, avg, 1.0);
    }`
        );
    }

    getLayout(): ex.VertexLayout {
        return this._shader!.getLayout();
    }

    getShader(): ex.Shader {
        return this._shader!.getShader();
    }
}
